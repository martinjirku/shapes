import { EDIT_POINT , RESET_POINTS, MOVE_POINT } from '../common/constants'
import { fromJS } from 'immutable'
import { getParallelogramCoord, getCurrentPointIndex,
         getNextCurrentPoint, getParallelogramCentroid,
         getParallelogramArea, getCircleRadius } from '../common/geom-helpers'

const EMPTY_POINTS =  {
    p1: null,
    p2: null,
    p3: null,
}

const EMPTY_CIRCLE = {
  coord: [],
  r: 0,
}

const EMPTY_PARALL = {
  coord: [],
  area: null,
  centroid: null,
}

const getDefaultGeometryState = ()=>{
  return fromJS({
    currentDrawPoint: 0,
    order: ['p1','p2','p3'],
    points: EMPTY_POINTS,
    parallelogram: EMPTY_PARALL,
    circle: EMPTY_CIRCLE,
  })
}

export const geometry = (state = getDefaultGeometryState(), action = {})=>{
  switch (action.type) {
    case MOVE_POINT:
      return movePoint(state, action)
    case EDIT_POINT:
      return addPoint(state, action)
    case RESET_POINTS:
      return state
        .set('points',fromJS(EMPTY_POINTS))
        .set('currentDrawPoint', 0)
        .set('parallelogram',fromJS(EMPTY_PARALL))
        .set('circle', fromJS(EMPTY_CIRCLE))
    default:
      return state
  }
}

const movePoint = (state, action)=>{
  const {x, y} = state.getIn(['points', action.pointId])
  if (!(x || y)) return state

  const newX = x + action.x
  const newY = y + action.y
  const newState = state.setIn(['points', action.pointId], {x: newX, y: newY})
  const parallelogram = getParallelogram(newState)
  return state
    .set('points', newState.get('points'))
    .set('parallelogram', fromJS(parallelogram))
    .set('circle', fromJS(getCircle(parallelogram)))
}

const addPoint = (state, action)=>{
  if(state.get('currentDrawPoint')>2) return state
  const currentPointIndex = getCurrentPointIndex(state)
  const {x,y} = action
  const newState = state.setIn(['points', currentPointIndex], {x, y})
  const parallelogram = getParallelogram(newState)
  return state
    .set('points', newState.get('points'))
    .set('currentDrawPoint', getNextCurrentPoint(state))
    .set('parallelogram', fromJS(parallelogram))
    .set('circle', fromJS(getCircle(parallelogram)))
}

const getParallelogram = (state)=>{
  const {p1, p2, p3} = state.get('points').toJS()
  if(!(p1 && p2 && p3)) return EMPTY_PARALL
  const coord = getParallelogramCoord(p1,p2,p3)
  return {
    coord: coord,
    centroid: getParallelogramCentroid(coord),
    area: getParallelogramArea(coord)
  }
}

const getCircle = (parallelogram)=>{
  if(!parallelogram || parallelogram.coord.length===0) return EMPTY_CIRCLE
  return {
    coord: parallelogram.centroid,
    r: getCircleRadius(parallelogram.area),
  }
}







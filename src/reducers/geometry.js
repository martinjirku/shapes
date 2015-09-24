import { EDIT_POINT , RESET_POINTS } from '../common/constants'
import { fromJS } from 'immutable'
import { getParallelogramCoord, getCurrentPointIndex, getNextCurrentPoint } from '../common/geom-helpers'

const EMPTY_POINTS =  {
    p1: null,
    p2: null,
    p3: null,
}

const EMPTY_CIRCLE = {
  coord: [],
  r: 0,
}

const getDefaultGeometryState = ()=>{
  return fromJS({
    currentDrawPoint: 0,
    order: ['p1','p2','p3'],
    points: EMPTY_POINTS,
    parallelogram: null,
    circle: EMPTY_CIRCLE,
  })
}

export const geometry = (state = getDefaultGeometryState(), action = {})=>{
  switch (action.type) {
    case EDIT_POINT:
      return editPoint(state, action)
    case RESET_POINTS:
      return state
        .set('points',fromJS(EMPTY_POINTS))
        .set('currentDrawPoint',0)
        .set('parallelogram',null)
        .set('circle', fromJS(EMPTY_CIRCLE))
    default:
      return state
  }
}

const editPoint = (state, action)=>{
  if(state.get('currentDrawPoint')>2) return state
  const currentPointIndex = getCurrentPointIndex(state)
  const {x,y} = action
  const newState = state.setIn(['points', currentPointIndex], {x, y})
  const parallelogram = getParallelogram(newState,action)
  return state
    .set('points', newState.get('points'))
    .set('currentDrawPoint', getNextCurrentPoint(state))
    .set('parallelogram', parallelogram)
    .set('circle', fromJS(getCircle(parallelogram)))
}

const getParallelogram = (state)=>{
  const {p1, p2, p3} = state.get('points').toJS()
  if(!(p1 && p2 && p3)) fromJS([])
  return getParallelogramCoord(p1,p2,p3)
}

const getCircle = (parallelogram)=>{
  if(!parallelogram || parallelogram.length===0) return EMPTY_CIRCLE
  const x = parallelogram[0][0] + Math.abs((parallelogram[0][0] - parallelogram[2][0]) / 2)
  const y = parallelogram[1][1] + Math.abs((parallelogram[1][1] - parallelogram[3][1]) / 2)
  return {
    coord: [x,y],
    r: 30,
  }
}







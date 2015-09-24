import { EDIT_POINT , RESET_POINTS } from '../common/constants'
import { fromJS } from 'immutable'

const EMPTY_POINTS =  {
    p1: null,
    p2: null,
    p3: null,
}

const getDefaultGeometryState = ()=>{
  return fromJS({
    currentDrawPoint: 0,
    order: ['p1','p2','p3'],
    points: EMPTY_POINTS,
    parallelogram: null,
    circle: null,
  })
}

export const geometry = (state = getDefaultGeometryState(), action = {})=>{
  switch (action.type) {
    case EDIT_POINT:
      return editPoint(state,action)
    case RESET_POINTS:
      return state
        .set('points',fromJS(EMPTY_POINTS))
        .set('currentDrawPoint',0)
    default:
      return state
  }
}

const editPoint = (state, action)=>{
  const stateJS = state.toJS()
  if(stateJS.currentDrawPoint > 2 ) return state
  const points = stateJS.points
  const currentPointIndex = stateJS.order[stateJS.currentDrawPoint]
  const {x,y} = action
  return state
    .setIn(['points', currentPointIndex], {x, y})
    .set('currentDrawPoint', (stateJS.currentDrawPoint +1 ))
}
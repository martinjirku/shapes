import { EDIT_POINT , RESET_POINTS, MOVE_POINT, TOGGLE_MODAL } from './constants'

export const editPoint = (x,y)=>{
  return {type: EDIT_POINT, x, y}
}

export const resetPoints = ()=>{
    return {type: RESET_POINTS}
}

export const movePoint = (pointId, x,y)=>{
  return {type: MOVE_POINT, pointId, x,y}
}

export const toggleAboutModal = ()=>{
  return {type: TOGGLE_MODAL}
}
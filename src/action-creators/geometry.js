import { EDIT_POINT , RESET_POINTS } from '../common/constants'

export const editPoint = (x,y)=>{
  return {type: EDIT_POINT, x, y}
}

export const resetPoints = ()=>{
    return {type: RESET_POINTS}
}
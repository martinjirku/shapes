import { Map, fromJS } from 'immutable'
import { geometry as geometryReducer } from './geometry'
import { TOGGLE_MODAL } from '../common/constants'

const getDefaultState = ()=>{
  return fromJS({
    isAboutModalOpen: false,
  })
}

export const rootReducer = (state = getDefaultState(), action = {})=>{
  const geometry = state.get('geometry')
  const isAboutModal = state.get('isAboutModalOpen')
  return state
    .set('geometry', geometryReducer(geometry, action))
    .set('isAboutModalOpen', toggleAboutModal(isAboutModal, action))
}

const toggleAboutModal = (state = false, action = {})=>{
  switch (action.type){
    case TOGGLE_MODAL:
      return !state
    default:
      return state
  }
}
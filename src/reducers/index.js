'use strict'
import { Map, fromJS } from 'immutable'
import { geometry as geometryReducer } from './geometry'

const getDefaultState = ()=>{
  return fromJS({
    isAboutOpen: false,
  })
}

export const rootReducer = (state = getDefaultState(), action = {})=>{
  const geometry = state.get('geometry')
  return state.set('geometry', geometryReducer(geometry, action))
}
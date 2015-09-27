import 'babel-core/polyfill'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { rootReducer } from './reducers/index'

import { Shapes } from './layout/shapes'

if(!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)){
  document.body.setAttribute('class','safari')
} else if (typeof InstallTrigger !== 'undefined'){
  document.body.setAttribute('class','firefox')
}

const store = window.store = createStore(rootReducer)

React.render(
  <Provider store={store}>
    {()=> <Shapes />}
  </Provider>, document.body);
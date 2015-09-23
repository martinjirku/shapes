import 'babel-core/polyfill'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { rootReducer } from './reducers/index'

import { Shapes } from './layout/shapes'

const store = window.store = createStore(rootReducer)

React.render(
  <Provider store={store}>
    {()=> <Shapes />}
  </Provider>, document.body);
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { coordsToString } from '../common/geom-helpers'
import { resetPoints, toggleAboutModal } from '../common/action-creators'

import { PaintWall } from './paintwall'
import { Modal } from '../components/modal'

@connect(state=>{
  state.toJS()
  return {
    points: state.getIn(['geometry', 'points']).toJS(),
    pallelogramArea: state.getIn(['geometry', 'parallelogram', 'area']),
    isAboutModalOpen: state.get('isAboutModalOpen')
  }
})
export class Shapes extends Component {
  constructor(props){
    super(props)
    this.aboutModal = <Modal close={this.toggleAboutModal.bind(this)}/>
  }

  onResetClick(evt){
    evt.preventDefault()
    this.props.dispatch(resetPoints())
  }
  toggleAboutModal(evt){
    this.props.dispatch(toggleAboutModal())
  }
  render(){
    let {p1, p2, p3} = this.props.points
    return (
      <div className='shapes-app'>
        <nav className='header-container'>
          <a className='logo' href='index.html'>Shapes</a>
          <button className='btn waves-effect waves-white' onClick={this.onResetClick.bind(this)}>Reset</button>
        </nav>
        <div className='working-area'>
          <PaintWall />
        </div>
        <div className='info-box'>
          <ul className='collection'>
            <li className='collection-item'>Point 1: <span>{coordsToString(p1)}</span></li>
            <li className='collection-item'>Point 2: <span>{coordsToString(p2)}</span></li>
            <li className='collection-item'>Point 3: <span>{coordsToString(p3)}</span></li>
            <li className='collection-item'>Area: <span>{this.props.pallelogramArea}</span></li>
          </ul>
        </div>
        <footer className='page-footer'>
          <div className='copyright container grey-text text-lighten-4 left'>@ 2015 Martin Jirku</div>
          <div className='tool-bar'>
            <button className='btn' onClick={this.toggleAboutModal.bind(this)}>About</button>
          </div>
        </footer>
        {this.props.isAboutModalOpen ? this.aboutModal : null }
      </div>
    )
  }
}
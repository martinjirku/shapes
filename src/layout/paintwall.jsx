import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Svg } from '../components/svg'
import { editPoint } from '../action-creators/geometry'
import { getElementPosition } from '../common/geom-helpers'

import { Point } from '../components/point'

@connect(state=>{
  const stateJS = state.toJS()
  return {
    nextPointToDraw: state.get('points', stateJS.geometry.currentDrawPoint),
    points: state.getIn(['geometry','points']),
  }
})
export class PaintWall extends Component {
  constructor(props){
    super(props)
  }
  onclick(evt){
    const {x, y} = getElementPosition({x: evt.clientX, y: evt.clientY},evt.currentTarget)
    this.props.dispatch(editPoint(x, y))
  }
  getPoints(){
    if(!this.props.points) return
    return this.props.points.map((point,key)=>{
      return (point && point.x && point.y ) && <Point x={point.x} y={point.y} key={key} />
    }).toArray()
  }
  render(){
    return (
      <div className='paint-wall'>
        <Svg onClick={this.onclick.bind(this)} >
          {this.getPoints()}
        </Svg>
      </div>
    )
  }
}
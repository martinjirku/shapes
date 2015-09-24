import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Svg } from '../components/svg'
import { editPoint } from '../action-creators/geometry'
import { getElementPosition } from '../common/geom-helpers'

import { Point } from '../components/point'
import { Parallelogram } from '../components/parallelogram'
import { Circle } from '../components/circle'

@connect(state=>{
  const stateGeom = state.get('geometry')
  return {
    nextPointToDraw: stateGeom.getIn(['points', stateGeom.get('currentDrawPoint')]),
    points: stateGeom.get('points'),
    parallelogram: stateGeom.get('parallelogram'),
    circle: stateGeom.get('circle'),
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
          <Parallelogram coord={this.props.parallelogram} />
          <Circle coord={this.props.circle.get('coord').toJS()} r={this.props.circle.get('r')} />
        </Svg>
      </div>
    )
  }
}
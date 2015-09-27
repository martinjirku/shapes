import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Svg } from '../components/svg'
import { editPoint } from '../common/action-creators'
import { getElementPosition } from '../common/geom-helpers'
import { movePoint } from '../common/action-creators'

import { Point } from '../components/point'
import { Parallelogram } from '../components/parallelogram'
import { Circle } from '../components/circle'

@connect(state=>{
  const stateGeom = state.get('geometry')
  return {
    nextPointToDraw: stateGeom.getIn(['points', stateGeom.get('currentDrawPoint')]),
    points: stateGeom.get('points'),
    parallelogram: stateGeom.getIn(['parallelogram', 'coord']),
    circle: stateGeom.get('circle'),
  }
})
export class PaintWall extends Component {
  constructor(props){
    super(props)
  }

  onClick(evt){
    if(this.wasDrag){
      this.wasDrag = false
      return
    }
    const {x, y} = getElementPosition({x: evt.clientX, y: evt.clientY}, evt.currentTarget)
    this.props.dispatch(editPoint(x, y))
  }
  onMousePointDown(key, evt){
    this.draggablePointId = key
    this.setLastDragPosition(evt)
  }
  setLastDragPosition(evt){
    this.lastDragPosition = {x: evt.pageX, y: evt.pageY}
  }
  onMouseUp(evt){
    this.stopDrag(evt)
  }
  stopDrag(evt){
    if(this.draggablePointId){
      this.draggablePointId = false
      this.wasDrag = true
    }
  }
  onMouseMove(evt){
    if(this.draggablePointId){
      this.props.points.get(this.draggablePointId)
      const x = evt.pageX - this.lastDragPosition.x
      const y = evt.pageY - this.lastDragPosition.y
      this.setLastDragPosition(evt)
      this.props.dispatch(movePoint(this.draggablePointId, x, y))
    }
  }

  getPoints(){
    if(!this.props.points) return
    return this.props.points.map((point, key)=>{
      return (point && point.x && point.y ) && <Point x={point.x} y={point.y}
                                                      key={key}
                                                      onMouseDown={this.onMousePointDown.bind(this, key)}/>
    }).toArray()
  }

  render(){
    return (
      <div className='paint-wall' onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)}>
        <Svg onClick={this.onClick.bind(this)}>
          {this.props.parallelogram.toJS()? <Parallelogram coord={this.props.parallelogram.toJS()}/> : ''}
          <Circle className='circle' coord={this.props.circle.get('coord').toJS()} r={this.props.circle.get('r')}/>
          {this.getPoints()}
        </Svg>
      </div>
    )
  }
}
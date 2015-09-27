import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Point extends Component {
    //onMouseDown(evt){
    //  this.setNewDragPoint(evt)
    //}
    //onMouseUp(evt){
    //  this.dragPoint = null
    //}
    //onMouseMove(evt){
    //  if(this.dragPoint){
    //    this.delta = {
    //      x: evt.pageX - this.dragPoint.x,
    //      y: evt.pageY - this.dragPoint.y
    //    }
    //    this.setNewDragPoint(evt)
    //    this.props.onMovePoint(this.delta.x, this.delta.y)
    //  }
    //}
    //setNewDragPoint(evt){
    //  this.dragPoint = {x: evt.pageX, y: evt.pageY}
    //}
    render(){
        return(
          <circle className='point' cx={this.props.x} cy={this.props.y} r="5.5"
                  onMouseDown={this.props.onMouseDown}
                  //onMouseMove={this.onMouseMove.bind(this)}
                  //onMouseUp={this.onMouseUp.bind(this)}
                  ></circle>
        )
    }
}

Point.defaultProps = {
  onMovePoint: ()=>{}
}

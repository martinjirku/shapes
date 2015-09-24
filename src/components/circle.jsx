import React, { Component } from 'react'
import { hasNullItem } from '../common/lang'

export class Circle extends Component {
  constructor(params){
    super(params)
    this.state = {}
  }
  componentWillReceiveProps(nextProps){
    const coord = nextProps.coord
    if(coord.length > 0 && !hasNullItem(coord)){
      this.setState({cx: coord[0], cy: coord[1], r: nextProps.r})
    } else {
      this.setState({cx: null, cy: null, r: null})
    }
  }
  render(){
    return (
      <circle cx={this.state.cx } cy={this.state.cy} r={this.state.r} fill='transparent' stroke='blue'/>
    )
  }
}

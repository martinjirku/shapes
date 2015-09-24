import React, { Component } from 'react'
import { getPathFromCoord} from '../common/geom-helpers'
import { hasNullItem } from '../common/lang'

export class Parallelogram extends Component {
  constructor(params){
    super(params)
    this.state = {}
  }
  componentWillReceiveProps(nextProps){
    if(!hasNullItem(nextProps.coord)){
      this.setState({d: getPathFromCoord(nextProps.coord)})
    } else {
      this.setState({d: null})
    }
  }
  render(){
    return (
        <path d={this.state.d } fill='transparent' stroke='blue'/>
    )
  }
}

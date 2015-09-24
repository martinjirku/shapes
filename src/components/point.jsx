import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Point extends Component {
    render(){
        return(
          <circle className='point' cx={this.props.x} cy={this.props.y} r="7.5"></circle>
        )
    }
}

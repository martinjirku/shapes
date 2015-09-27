import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Point extends Component {
    render(){
        return(
          <circle className='point'
                  cx={this.props.x}
                  cy={this.props.y}
                  r="5.5"
                  stroke='red'
                  onMouseDown={this.props.onMouseDown}
                  ></circle>
        )
    }
}

Point.defaultProps = {
  onMouseDown: ()=>{}
}

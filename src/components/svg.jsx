import React, { Component } from 'react'
import { connect } from 'react-redux'


export class Svg extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <svg className='svg' onClick={this.props.onClick}>
        {this.props.children}
      </svg>
    )
  }
}
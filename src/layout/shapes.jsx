'use strict'

import React, { Component } from 'react'
import { PaintWall } from './paintwall'


export class Shapes extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className='shapes-app'>
        <nav className='header-container'>
            <a className='logo' href='index.html'>Shapes</a>
            <button className='btn waves-effect waves-white'>Reset</button>
        </nav>
        <div className='working-area'>
          <PaintWall />
        </div>
        <footer className='page-footer'>
          <div className='copyright container grey-text text-lighten-4 left'>@ 2015 Martin Jirku</div>
          <div className='tool-bar'>
                <button className='btn'>About</button>
          </div>
        </footer>
      </div>
    )
  }
}
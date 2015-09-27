import React, { Component } from 'react'
import classnames from 'classnames'

export class Modal extends Component {
  onClick(){
    this.props.close()
  }

  getClasses(){
    const classes = {
      'modal-container': true,
    }
    return classnames(classes)
  }

  render(){
    return (
      <div className={this.getClasses()}>
        <div className='overlay'/>
        <div className='modal'>
          <div className='modal-content'>
            <h3>About Shapes</h3>

            <p>The Shapes is a simple JavaScript application, which offers to users
              a drawing functionality.
            </p>
            <h5>A short user guide</h5>
            <h6>Workspace</h6>

            <p>Application contains three main sections:
              <ul>
                <li>Header</li>
                <li>Working area</li>
                <li>Footer</li>
              </ul>
            </p>
            <p>Header contains the name of the app, and the reset button on the right. Working
              area show the drawing space and basic information about the points, parallelogram
              and circle.</p>
            <h6>Usage</h6>

            <p>By using the Shapes application, user is able to create parallelogram and circle
              only by choosing three points on the Working area. When application is started
              the working area is empty. User can place points by clicking on the working area.
              If the point is wrongly placed, user is still able to drag point to different position. After third point
              is placed on the screen, a parallelogram and circle is created. Circle is placed to the center
              of parallelogram and has same area as parallelogram. If one wants to start over, there is reset button.
              After shapes are created, it is still possible to rearrange the three points, circle and parallelogram is
              updated accordingly.</p>

            <h5>Author and licencing</h5>

            <p>The source code can be found
              at <a href='https://github.com/martinjirku/shapes' target='_blank'>github</a></p>

            <p>MIT License
              Copyright ® 2015 Martin Jirku <br /><br />
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
              associated documentation files (the "Software"), to deal in the Software without restriction, including
              without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
              following conditions:
              <br /><br />
              The above copyright notice and this permission notice shall be included in all copies or substantial
              portions of the Software.
              <br /><br />
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
              EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
              IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR
              THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
          </div>
          <div className='modal-footer'>
            <button className='btn' onClick={this.onClick.bind(this)}>OK</button>
          </div>
        </div>
      </div>
    )
  }
}
import {DEFAULT_COORD_DELIMITER} from './constants'

export const getElementPosition = (coordinates = {x: 0, y: 0} , element = {})=>{
    return {
        y: coordinates.y - element.offsetTop,
        x: coordinates.x - element.offsetLeft,
    }
}

export const coordsToString = (coords, delimiter = DEFAULT_COORD_DELIMITER)=>{
    if(!coords) return ''
    return coords.x + delimiter + coords.y
}

export const getParallelogramCoord = (p1, p2, p3)=>{
    //p1p2→=p3p4→
    //(p2.X - p1.x,p2.y-p1.y ) = (X - p3.x, Y - p3.Y)
    //      |
    //      V
    //X = p2.x - p1.x + p3.x
    //Y = p2.y - p1.y + p3.y
    //      |
    //      V
    //X = p1.x - p2.x + p3.x
    //Y = p1.y - p2.y + p3.y
    if(!p1 || !p2 || !p3) return

    const x = p1.x - p2.x + p3.x
    const y = p1.y - p2.y + p3.y
    return [
        [p1.x, p1.y],
        [p2.x, p2.y],
        [p3.x, p3.y],
        [x, y]
    ]
}

export const getPathFromCoord = (pathCoord)=>{
    if(!pathCoord) return
    return pathCoord.reduce((intermediatePath, coord, index, arr)=>{
        let command = 'L',
          suffixCommand = ''
        if(index === 0) {
            command = 'M'
        }
        if(index === (arr.length - 1)) {
          suffixCommand = ' Z'
        }
        return intermediatePath + command + coord[0] + ' ' + coord[1] + suffixCommand
    },'')
}

export const getCurrentPointIndex = (state)=>{
    return state.getIn(['order',state.get('currentDrawPoint')])
}

export const getNextCurrentPoint = (state)=>{
  return state.get('currentDrawPoint') + 1
}
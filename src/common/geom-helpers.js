import {DEFAULT_COORD_DELIMITER} from './constants'

export const getLineWidth = (a,b)=>{
  return sqrt(pow(a[0]-b[0]) + pow(a[1]-b[1]))
}

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

export const getParallelogramCentroid = (parallelogramCoord)=>{
  return [
    parallelogramCoord.reduce((sum,coord)=>sum+coord[0],0) / 4, //X
    parallelogramCoord.reduce((sum,coord)=>sum+coord[1],0) / 4  //Y
  ]
}

//The idea of algorithm for getting the area is taken from http://alienryderflex.com/polygon_area/
export const getPolygonArea = (polygonCoord)=>{
  if(polygonCoord.length < 3) return 0
  let area = 0
  for (let i = 0; i < polygonCoord.length; i++){
    const [x1,y1] = polygonCoord[i]
    const [x2,y2] = polygonCoord[i+1] || polygonCoord[0]
    area += x1*y2 - y1*x2
  }
  return Math.abs(area) / 2
}

export const getParallelogramArea = parallelogramCoord=>getPolygonArea(parallelogramCoord)

export const getCircleRadius = circleArea=>{
  return Math.sqrt(circleArea / Math.PI)
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

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
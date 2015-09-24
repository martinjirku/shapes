export const hasNullItem = (arr)=>{
  if(!arr) return !arr
  return arr.some((item)=>{
    return item === null || item === undefined
  })
}
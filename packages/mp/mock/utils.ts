export const randomNum = (maxNum = 1, minNum = 0): number => Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)

export const getArray = (cb, max = 10, min?: number) => {
  const i = min ? randomNum(max, min) : max
  return new Array(i).fill(null).map(cb)
}

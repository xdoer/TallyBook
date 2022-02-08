export interface Res<Q> {
  data: Q
  error: any
  loading: boolean
}

export interface Config<Q> {
  deps?: any[]
  loop?: number
  onUpdate?: (prev: Q, value: Q) => Q
}

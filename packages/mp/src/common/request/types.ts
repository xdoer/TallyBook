export interface Res<Q> {
  data: Q
  error: any
  loading: boolean
}

export interface Config<Q> {
  lazy?: boolean
  loop?: number
  onUpdate?: (prev: Q, value: Q) => Q
}

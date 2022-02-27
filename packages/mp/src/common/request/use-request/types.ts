import { PQRequest, PQResponse } from '@prequest/types'

export type GlobalCache = { [key: string]: Cache }

interface ToFetchConfig<Q> {
  onUpdate?: (prev: PQResponse<Q>, value: PQResponse<Q>) => PQResponse<Q>
}

export type Cache<Q = any> = {
  called: boolean
  valid: boolean
  loading: boolean
  error: any
  request: PQRequest
  response: PQResponse<Q>
  stopLoop(): void
  toFetch(opt?: PQRequest | ((o: PQRequest) => PQRequest), config?: ToFetchConfig<Q>): void
  deps: any[]
  depsIsChanged: boolean
}

export interface Config<Q = any> {
  key?: string
  deps?: any[]
  lazy?: boolean
  loop?: number
  onUpdate?: (prev: PQResponse<Q>, value: PQResponse<Q>) => PQResponse<Q>
}

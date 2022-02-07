import { PreQuestInstance } from '@prequest/core'
import { TallyBook } from '@tally-book/types'
import { setTimeoutInterval, clearTimeoutInterval } from '@xdoer/timeout-interval'
import { useEffect, useRef, useState } from 'react'
import { Res, Config } from './types'

// declare function queryHook<T, Q>(opt: T | (() => T), config?: Config<TallyBook.Response<Q>>): void
// declare function queryHook<T, Q>(path: string, opt?: T | (() => T), config?: Config<TallyBook.Response<Q>>): void

type GlobalCache = { [key: string]: Cache }

type Cache = {
  loading: boolean
  error: any
  request: any
  response: any
}

export default function createQueryHook<T, N>(prequest: PreQuestInstance<T, N>) {
  const globalCache: GlobalCache = {}

  function getOptions(path: string, opt?: T | (() => T)) {
    // @ts-ignore
    return typeof path === 'string' ? { path, ...(typeof opt === 'function' ? opt() : opt) } : path
  }

  function getQueryOptions(cache: any, options: any) {
    if (cache.request) return cache.request

    return (cache.request = options)
  }

  function getUniqueKey(options) {
    return options.path
  }

  function initCache(key) {
    globalCache[key] = {
      loading: false,
      error: null,
      request: null,
      response: null,
    }
    return globalCache[key]
  }

  return function <Q>(path: string, opt?: T | (() => T), config?: Config<TallyBook.Response<Q>>) {
    const options = getOptions(path, opt)
    const uniqueKey = getUniqueKey(options)
    const cache = globalCache[uniqueKey] || initCache(uniqueKey)
    const queryOptions = getQueryOptions(cache, options)
    const rerender = useState({})[1]

    useEffect(() => {
      makeFetch()
    }, [])

    async function makeFetch() {
      if (cache.loading) return

      cache.loading = true
      rerender({})
      try {
        const res = await prequest(queryOptions)
        cache.response = res
      } catch (e) {
        cache.error = e
      }
      cache.loading = false
      rerender({})
    }

    return cache
  }
}

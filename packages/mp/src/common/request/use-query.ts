import { PreQuestInstance } from '@prequest/core'
import { useStore } from '@xdoer/state-bus'
import { setTimeoutInterval, clearTimeoutInterval } from '@xdoer/timeout-interval'
import { useEffect, useRef } from 'react'
import { Config } from './types'

type GlobalCache = { [key: string]: Cache }

type Cache = {
  called: boolean
  valid: boolean
  loading: boolean
  error: any
  request: any
  response: any
}

export default function createQueryHook<T, N>(prequest: PreQuestInstance<T, N>) {
  const globalCache: GlobalCache = {}

  function getCache(key: string, opt: any) {
    const cached = globalCache[key]
    if (cached?.valid) return cached

    const cache = cached || initCache(key)

    try {
      const _ = typeof opt === 'function' ? opt() : opt
      cache.request = { path: key, ..._ }
      cache.valid = true
    } catch (e) {
      cache.valid = false
    }

    return cache
  }

  function initCache(key) {
    const cache: Cache = {
      valid: true,
      called: false,
      loading: false,
      error: null,
      request: null,
      response: null,
    }
    return (globalCache[key] = cache)
  }

  return function <Q>(path: string, opt?: T | (() => T), config?: Config<Q>) {
    const cache = getCache(path, opt)
    const { onUpdate, deps = [], loop } = config || {}
    const rerender = useStore(path, {})[1]
    const timerRef = useRef<any>()

    // 初次加载
    useEffect(() => {
      if (!cache.valid || cache.called) return
      cache.called = true
      if (!loop) {
        makeFetch()
        return
      }
      clearTimeoutInterval(timerRef.current)
      timerRef.current = setTimeoutInterval(makeFetch, loop)
    }, [cache.valid])

    // 依赖变更
    useEffect(() => {
      if (!cache.valid || !cache.called || !deps.length) return
      if (!loop) {
        makeFetch()
        return
      }
      clearTimeoutInterval(timerRef.current)
      timerRef.current = setTimeoutInterval(makeFetch, loop)
    }, [...deps])

    // 卸载时清除计时器
    useEffect(() => {
      return () => {
        clearTimeoutInterval(timerRef.current)
      }
    }, [])

    async function makeFetch() {
      cache.loading = true
      try {
        const res = await prequest(cache.request)
        cache.response = onUpdate?.(cache.response, res as any) || res
      } catch (e) {
        cache.error = e
      }
      cache.loading = false
      rerender({})
    }

    return cache
  }
}

import { PreQuestInstance, Config as PreQuestConfig } from '@prequest/types'
import { StateBusManager } from '@xdoer/state-bus'
import { setTimeoutInterval, clearTimeoutInterval } from '@xdoer/timeout-interval'
import { useEffect, useRef } from 'react'
import { Config, Cache, GlobalCache } from './types'
import { noop } from './utils'

export default function createQueryHook(prequest: PreQuestInstance) {
  const globalCache: GlobalCache = {}

  function getCache<Q>(key: string, opt: any): Cache<Q> {
    const cached = globalCache[key]
    if (cached?.valid) return cached

    const cache = cached || initCache(key)

    return checkCache(cache, opt)
  }

  function checkCache(cache: Cache, opt: any) {
    try {
      cache.request = typeof opt === 'function' ? opt() : opt
      cache.valid = true
    } catch (e) {
      cache.valid = false
    }
    return cache
  }

  function initCache(key: string) {
    const cache = {
      valid: true,
      called: false,
      loading: true,
      error: null,
      request: null as any,
      response: null as any,
      stopLoop: noop,
      toFetch: noop,
      deps: [],
      depsIsChanged: false,
    }
    return (globalCache[key] = cache)
  }

  const sbm = new StateBusManager()

  function useQuery<Q>(
    path: string,
    opt?: PreQuestConfig | (() => PreQuestConfig),
    config?: Config<Q>,
  ) {
    const { onUpdate, deps = [], loop, lazy, key } = config || {}
    const cacheKey = key || path
    const cache = getCache<Q>(cacheKey, opt)
    const store = sbm.init(cacheKey, {})
    const rerender = store.useState()[1]
    const timerRef = useRef<any>()

    store.hooks.onUnMount = () => {
      delete globalCache[cacheKey]
    }

    // 记录初始的依赖
    useEffect(() => {
      cache.deps = deps
      return () => clearTimeoutInterval(timerRef.current)
    }, [])

    useEffect(() => {
      cache.depsIsChanged = deps.some((v, i) => cache.deps[i] !== v)
      cache.deps = cache.depsIsChanged ? deps : cache.deps

      // 已经初始化过了
      if (cache.called && !cache.depsIsChanged) return

      // lazy 模式只允许手动触发请求
      if (lazy) return

      // 如果参数无效
      if (!checkCache(cache, opt).valid) return

      // 可以发起请求
      cache.called = true
      if (!loop) {
        makeFetch()
        return
      }
      if (typeof timerRef.current == 'undefined') {
        timerRef.current = setTimeoutInterval(makeFetch, loop)
      }
    }, [cache.valid, ...deps])

    // 发起请求
    async function makeFetch(cb = onUpdate) {
      cache.loading = true
      try {
        const res = await prequest<Q>(path, cache.request)
        cache.response = cb?.(res, cache.response) ?? res
      } catch (e) {
        cache.error = e
      }
      cache.loading = false
      rerender({})
    }

    // 停止循环
    cache.stopLoop = () => {
      clearTimeoutInterval(timerRef.current)
      timerRef.current = undefined
    }

    // 手动执行请求
    cache.toFetch = (fetchOpt, config) => {
      const newCache = checkCache(cache, opt)

      if (fetchOpt) {
        if (typeof fetchOpt === 'function') {
          // @ts-ignore
          newCache.request = fetchOpt(newCache.request)
        } else {
          newCache.request = fetchOpt
        }
      }

      newCache.valid = true
      makeFetch(config?.onUpdate)
    }

    return cache
  }

  useQuery.get = <Q = any>(key: string): Cache<Q> => {
    return globalCache[key]
  }

  return useQuery
}

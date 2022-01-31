import { PreQuestInstance } from '@prequest/core'
import { setTimeoutInterval, clearTimeoutInterval } from '@xdoer/timeout-interval'
import { useEffect, useRef, useState } from 'react'
import { Res, Config } from './types'
import { parseOptions, defaultUpdate } from './utils'

export default function <T, N>(prequest: PreQuestInstance<T, N>) {
  return function <Q>(opt: T | (() => T), config?: Config<Q>) {
    const [res, setRes] = useState<Res<Q>>({ data: null, error: null, loading: true })
    const calledRef = useRef(false)
    const variables = useRef<T | null>(null)
    const loadingRef = useRef(false)
    const { lazy, loop, onUpdate = defaultUpdate } = config || {}
    const timerId = useRef<any>(null)
    const [_loop, setLoop] = useState(false)

    useEffect(() => {
      if (!_loop) return
      // 这里 options 参数在循环请求接口的过程中是不变的，避免其他 hook 变更引起参数变化
      timerId.current = setTimeoutInterval(() => fetchData(variables.current!), loop)
    }, [_loop, loop])

    useEffect(() => {
      return () => {
        clearTimeoutInterval(timerId.current)
      }
    }, [])

    useEffect(() => {
      // 首次发请求调用
      if (calledRef.current) return

      // 获取参数
      const options = parseOptions(opt, variables.current)

      // 参数不满足，不发起请求
      if (!options) return

      // 保存初始参数
      variables.current = options

      // lazy 状态下不立即请求
      if (lazy) return

      // 循环请求
      if (loop) {
        setLoop(true)
      } else {
        fetchData(options)
      }
    }, [opt, lazy, loop])

    // 获取数据
    async function fetchData(opt: T) {
      try {
        calledRef.current = true
        loadingRef.current = true
        const res = await prequest(opt)
        loadingRef.current = false
        setRes(prev => {
          const { data } = prev
          return {
            loading: false,
            data: onUpdate(data!, res as any),
            error: null,
          }
        })
        return res
      } catch (e) {
        loadingRef.current = false
        setRes({ loading: false, error: e, data: null })
        return e
      }
    }

    // 刷新数据
    async function request(opt: T | ((v: T) => T)) {
      const options = parseOptions(opt, variables.current)
      // request 场景是在事件触发中，所以 options 参数应当是一定有的
      variables.current = options!

      const res = await fetchData(options!)

      // request 应当可以正常抛出异常
      if (res instanceof Error) throw res

      // 如果是 lazy 与 loop
      if (lazy && loop) {
        setLoop(true)
      }

      return res
    }

    // 清除循环
    function clearLoop() {
      setLoop(false)
      clearTimeoutInterval(timerId.current)
    }

    return {
      request,
      loadingRef,
      clearLoop,
      ...res,
    }
  }
}
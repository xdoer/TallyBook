import Taro from '@tarojs/taro'
import { Time } from '@tally-book/types'

export function uuid(length = 9) {
  let s: any = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < length; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  // s[14] = '4'
  // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  // s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export function isUndefined(d: any) {
  return typeof d === 'undefined'
}

export function getStorage<T>(key: string, init?: any): Promise<T> {
  return new Promise((resolve) => {
    // @ts-ignore
    Taro.getStorage({
      key,
      success(res) {
        resolve(res.data as any)
      },
      fail() {
        resolve(init)
      },
    })
  })
}

export function sleep(t = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}

export function clone(v) {
  return JSON.parse(JSON.stringify(v))
}

export function getTime(t = new Date()): Time {
  return {
    date: t.getDate(),
    day: t.getDay(),
    month: t.getMonth(),
    year: t.getFullYear(),
  }
}

export function noop() { }

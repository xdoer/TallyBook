import Taro from '@tarojs/taro'
import { Common } from '@/types/util'

export const convertSearchParamsToObj = (searchParams = '') => {
  const obj: Common = {}
  const param = searchParams.match(/([^&=\?]+)=?([^&]*)/g)
  if (!param) return {}
  for (let i of param) {
    const [key, value] = i.split('=')
    obj[key] = decodeURI(value)
  }
  return obj
}

export function formatDate(date: Date = new Date(), fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  const o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      )
    }
  }
  return fmt
}

export function uuid() {
  let s: any = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

export function isUndefined(d: any) {
  return typeof d === 'undefined'
}

export function getStorage<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    Taro.getStorage({
      key,
      success(res) {
        resolve(res.data as any)
      },
      fail() {
        resolve(undefined as any)
      },
    })
  })
}

export function sleep(t = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}

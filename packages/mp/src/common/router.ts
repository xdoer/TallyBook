import Taro from '@tarojs/taro'
import { convertSearchParamsToObj } from '@xdoer/x'
import { routerService } from '@/service/routerService'

/**
 * 路由跳转
 * @param url 要跳转的地址
 * @param params 对象参数
 */
export function navigateTo(url: string, params?: object, opt?: Partial<Taro.navigateTo.Option>) {
  if (!params) return Taro.navigateTo({ url })
  const _url = `${url}?navParams=${JSON.stringify(params)}`
  Taro.navigateTo({ url: _url, ...opt })
}

/**
 * 路由跳转
 * @param url 要跳转的地址
 * @param params 对象参数
 */
export function reLaunch(url: string, params?: object, opt?: Partial<Taro.reLaunch.Option>) {
  if (!params) return Taro.reLaunch({ url })

  const _url = `${url}?navParams=${JSON.stringify(params)}`
  Taro.reLaunch({ url: _url, ...opt })
}

/**
 * 路由返回
 */
export function navigateBack(opt?: Partial<Taro.navigateBack.Option>) {
  Taro.navigateBack({
    ...opt,
    fail() {
      reLaunch(routerService.Index)
    },
  })
}

/**
 * 解析路由参数
 */
export function useRouter<T>(): T {
  let { params } = Taro.useRouter()
  try {
    if (params['navParams']) {
      return JSON.parse(params['navParams'])
    }

    if (params['scene']) {
      params = {
        ...params,
        ...convertSearchParamsToObj(decodeURIComponent(params['scene'])),
      }
    }

    return Object.entries(params).reduce((result: any, [key, value]: any) => {
      return { ...result, [key]: /^\d+$/.test(value) ? Number(value) : value }
    }, {})
  } catch (e) {
    console.warn('参数解析失败', e)
  }

  return {} as T
}

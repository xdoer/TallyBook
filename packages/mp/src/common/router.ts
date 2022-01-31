import {
  useRouter as useOriginRouter,
  navigateTo as originNavigateTo,
  navigateBack as originNavigateBack,
  reLaunch as originReLaunch,
} from '@tarojs/taro'
import { convertSearchParamsToObj } from './utils'
import { routerService } from '@/service/routerService'

/**
 * 路由跳转
 * @param url 要跳转的地址
 * @param params 对象参数
 */
export function navigateTo(url: string, params?: object, opt?: Partial<originNavigateTo.Option>) {
  if (!params) return originNavigateTo({ url })
  const _url = `${url}?navParams=${JSON.stringify(params)}`
  originNavigateTo({ url: _url, ...opt })
}

/**
 * 路由跳转
 * @param url 要跳转的地址
 * @param params 对象参数
 */
export function reLaunch(url: string, params?: object, opt?: Partial<originReLaunch.Option>) {
  if (!params) return originReLaunch({ url })

  const _url = `${url}?navParams=${JSON.stringify(params)}`
  originReLaunch({ url: _url, ...opt })
}

/**
 * 路由返回
 */
export function navigateBack(opt?: Partial<originNavigateBack.Option>) {
  originNavigateBack({
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
  let { params } = useOriginRouter()
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

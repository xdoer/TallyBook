import { localRouter } from '@/server/router'
import { PLATFORM } from '@/store/app'
import { Request, adapter as mpAdapter } from '@prequest/miniprogram'
import Taro from '@tarojs/taro'

export async function adapter(options: Request) {
  const { isServer } = await PLATFORM.getState()
  if (isServer) return mpAdapter(Taro.request)(options) as any

  return localRouter.call(options) as any
}

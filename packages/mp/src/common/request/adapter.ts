import { localRouter } from '@/server/router'
import { loginStore } from '@/store'
import { PLATFORM } from '@/store/app'
import { Request, adapter as mpAdapter } from '@prequest/miniprogram'
import Taro from '@tarojs/taro'

export async function adapter(options: Request) {
  const { isServer } = await PLATFORM.getState()
  if (isServer) return mpAdapter(Taro.request)(options) as any

  const { user } = await loginStore.getState()

  return localRouter.call(options, { user }) as any
}

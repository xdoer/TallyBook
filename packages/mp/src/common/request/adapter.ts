import { localRouter } from '@/server/router'
import { loginStore, PLATFORM } from '@/store'
import { adapter as mpAdapter } from '@prequest/miniprogram'
import Taro from '@tarojs/taro'

export async function adapter(options) {
  const { isServer } = await PLATFORM.getState()
  if (isServer) return mpAdapter(Taro.request)(options) as any

  if (options.skipTokenCheck) return localRouter.call(options)

  const { user } = loginStore.getState()
  return localRouter.call(options, { user }) as any
}

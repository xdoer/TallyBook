import Taro, { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro'
import { StorageState } from "@/common/StorageState"

const KEY = 'system info'

type SystemInfo = Taro.getSystemInfoSync.Result & {
  menuRect: Taro.getMenuButtonBoundingClientRect.Rect
  navBarHeight: number
}

const systemStore = new StorageState<SystemInfo>(KEY)

export function useSystemInfo() {
  const [systemInfo, setSystemInfo] = systemStore.useState()

  systemStore.hooks.onMount = async () => {
    const cache = await systemStore.getState()

    if (cache) return

    const info = getSystemInfoSync()
    const menuRect = getMenuButtonBoundingClientRect()

    const navBarHeight = info.safeArea.top + menuRect.height + 10

    setSystemInfo({ ...info, menuRect, navBarHeight })
  }

  return { systemInfo: systemInfo || {} }
}

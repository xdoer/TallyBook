import Taro, {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
  showShareMenu,
} from '@tarojs/taro'
import { useEffect } from 'react'
import { createShareHook } from '@xdoer/state-bus'
import { StorageState } from '@/common/StorageState'
import { appStoreEnum } from '@/common/store.enum'

type SystemInfo = Taro.getSystemInfoSync.Result & {
  menuRect: Taro.getMenuButtonBoundingClientRect.Rect
  navBarHeight: number
}

export const useSystemInfo = createShareHook((state) => {
  const [systemInfo, setSystemInfo] = state.useState()

  useEffect(() => {
    // @ts-ignore
    if (state.init) return
    // @ts-ignore
    state.init = true

    const info = getSystemInfoSync()
    const menuRect = getMenuButtonBoundingClientRect()

    const navBarHeight = info.safeArea.top + menuRect.height + 10

    setSystemInfo({ ...info, menuRect, navBarHeight })
  }, [])

  return { systemInfo: systemInfo || {} }
}, {} as SystemInfo)

export const useShare = () => {
  useEffect(() => {
    showShareMenu({
      withShareTicket: true,
    })
  }, [])
}

export const PLATFORM = new StorageState(appStoreEnum.platform, {
  isWxCloud: false,
  isLocal: true,
  isServer: false,
})

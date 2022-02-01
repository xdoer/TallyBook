import { getMenuButtonBoundingClientRect, getSystemInfoSync, showShareMenu } from '@tarojs/taro'
import { useEffect } from 'react'
import { createShareHook } from '@xdoer/state-bus'

export const useSystemInfo = createShareHook((state) => {
  const [systemInfo, setSystemInfo] = state.useState()

  useEffect(() => {
    if (systemInfo) return

    const info = getSystemInfoSync()
    const menuRect = getMenuButtonBoundingClientRect()

    const navBarHeight = info.safeArea.top + menuRect.height + 10

    setSystemInfo({ ...info, menuRect, navBarHeight })
  }, [systemInfo])

  return { systemInfo: systemInfo || {} }
}, undefined as any)

export const useShare = () => {
  useEffect(() => {
    showShareMenu({
      withShareTicket: true,
    })
  }, [])
}

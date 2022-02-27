import { showShareMenu } from '@tarojs/taro'
import { useEffect } from 'react'
import { StorageState } from '@/common/StorageState'
import { appStoreEnum } from '@/common/store.enum'

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

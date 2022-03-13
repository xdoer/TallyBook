import { showShareMenu, useShareTimeline, useShareAppMessage } from '@tarojs/taro'
import { useEffect } from 'react'
import { StorageState } from '@/common/StorageState'
import { appStoreEnum } from '@/common/store.enum'

export const useShare = () => {
  useEffect(() => {
    showShareMenu({
      withShareTicket: true,
      showShareItems: ['wechatFriends', 'wechatMoment'],
    })
  }, [])

  useShareAppMessage(() => {
    return {
      title: '我记个账',
    }
  })

  useShareTimeline(() => {
    return {
      title: '我记个账',
    }
  })
}

export const PLATFORM = new StorageState(appStoreEnum.platform, {
  isWxCloud: false,
  isLocal: true,
  isServer: false,
})

import { FC } from 'react'
import { View } from '@fower/taro'
import { Button } from '@taroify/core'
import { getUserProfile } from '@tarojs/taro'
import { popUpService } from './PopupContainer'
import { apiService } from '@/service/apiService'

interface AuthProps {
  success(): void
}

export const Auth: FC<AuthProps> = ({ success }) => {
  function onGetUserInfo() {
    getUserProfile({
      desc: '授权获取用户信息',
      async success(res) {
        const { nickName, avatarUrl } = res.userInfo
        await apiService.createUser({ nickName, avatarUrl })
        success()
        popUpService.close()
      },
    })
  }

  return (
    <View>
      <Button openType="getUserInfo" onClick={onGetUserInfo}>
        授权
      </Button>
    </View>
  )
}

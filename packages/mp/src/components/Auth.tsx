import { FC, useEffect, useState } from 'react'
import { View } from '@fower/taro'
import { Button } from '@taroify/core'
import { getUserProfile } from '@tarojs/taro'
import { popUpService } from './PopupContainer'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'

interface AuthProps {}

interface User {
  id: number
  name: string
}

export const Auth: FC<AuthProps> = ({}) => {
  const { response } = useQuery<any>('/login')

  console.log(response)

  function onGetUserInfo() {
    getUserProfile({
      desc: '授权获取用户信息',
      success(res) {
        const { nickName, avatarUrl } = res.userInfo
        apiService.createUser({ nickName, avatarUrl })
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

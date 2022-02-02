import { FC } from 'react'
import { View } from '@fower/taro'
import { Button } from '@taroify/core'
import { getUserProfile } from '@tarojs/taro'
import { popUpService } from './PopupContainer'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'

interface AuthProps {}

export const Auth: FC<AuthProps> = ({}) => {
  const res = useQuery<any>({ path: '/login' })
  const user = res.data?.data

  console.log('查看', user)

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

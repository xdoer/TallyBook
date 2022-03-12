import { FC } from 'react'
import { View } from '@fower/taro'
import { Button } from '@taroify/core'
import { getUserProfile } from '@tarojs/taro'
import { layerService } from '@/service/layerService'
import { apiService } from '@/service/apiService'
import { LayerKey } from '@/common/constants'

interface AuthProps {
  success(): void
}

export const Auth: FC<AuthProps> = ({ success }) => {
  function onGetUserInfo() {
    getUserProfile({
      desc: '授权获取用户信息',
      async success(res) {
        await apiService.register(res.userInfo)
        success()
        layerService.close(LayerKey.auth)
      },
    })
  }

  return (
    <View minH-40vh maxH-80vh p-30 pb-100 position="relative">
      让我看看你是谁？
      <Button
        color="primary"
        size="large"
        block
        shape="round"
        openType="getUserInfo"
        style={{
          position: 'fixed',
          bottom: '20px',
          width: '80%',
          left: '10%',
        }}
        onClick={onGetUserInfo}
      >
        授权基本信息
      </Button>
    </View>
  )
}

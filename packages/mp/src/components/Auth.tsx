import { FC } from 'react'
import { View } from '@fower/taro'
import { Button } from '@taroify/core'
import { getUserProfile, exitMiniProgram } from '@tarojs/taro'
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
    <View minH-30vh maxH-80vh p-30 pb-100 position="relative" pt-100>
      <View text4XL mb-50>
        让我看看你是谁？
      </View>
      <View text3XL gray400>
        授权数据仅用于本地展示。
      </View>
      <View text3XL gray400>
        程序产生的所有数据存于本地，卸载小程序后即删除所有数据，请谨慎操作
      </View>

      <View fixed bottom0 left0 right0 p-16px flex bgWhite justifyContent="space-between">
        <Button
          size="large"
          block
          shape="round"
          style={{ marginRight: '10px' }}
          onClick={() => exitMiniProgram()}
        >
          暂不授权
        </Button>
        <Button
          color="primary"
          size="large"
          block
          shape="round"
          style={{ marginLeft: '10px' }}
          openType="getUserInfo"
          onClick={onGetUserInfo}
        >
          授权基本信息
        </Button>
      </View>
    </View>
  )
}

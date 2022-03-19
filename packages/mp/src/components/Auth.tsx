import { FC, useEffect, useRef } from 'react'
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
  const init = useRef(false)

  useEffect(() => {
    layerService.watch(LayerKey.auth, async (value) => {
      if (!value.visible && !init.current) {
        await apiService.register({
          avatarUrl:
            'https://thirdwx.qlogo.cn/mmopen/vi_32/lvT9AbV5MWfU3SHSWPObwL9QsLvfBosIRf14xs27Jj0SC90tZxHPazu6C0o9rpCVr7rrnWcottUwmYjnHpDVZw/132',
          nickName: '默认用户',
        })
        success()
      }
    })
  }, [])

  async function onGetUserInfo(useDefault = false) {
    init.current = true
    if (useDefault) {
      await apiService.register({
        avatarUrl:
          'https://thirdwx.qlogo.cn/mmopen/vi_32/lvT9AbV5MWfU3SHSWPObwL9QsLvfBosIRf14xs27Jj0SC90tZxHPazu6C0o9rpCVr7rrnWcottUwmYjnHpDVZw/132',
        nickName: '默认用户',
      })
      success()
      layerService.close(LayerKey.auth)
    } else {
      getUserProfile({
        desc: '授权获取用户信息',
        async success(res) {
          await apiService.register(res.userInfo)
          success()
          layerService.close(LayerKey.auth)
        },
      })
    }
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
          onClick={() => {
            onGetUserInfo(true)
          }}
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
          onClick={() => {
            onGetUserInfo(false)
          }}
        >
          授权基本信息
        </Button>
      </View>
    </View>
  )
}

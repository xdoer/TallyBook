import { FC } from 'react'
import { View } from '@fower/taro'
import { Button, Toast } from '@taroify/core'
import { layerService } from '@/service/layerService'
import { clearStorage } from '@tarojs/taro'
import { LayerKey } from '@/common/constants'

interface MeSettingProps {}

export const Setting: FC<MeSettingProps> = ({}) => {
  const { open, close } = layerService.getUnit()

  function clear() {
    open({
      cancelText: '取消',
      okText: '确定',
      content: '删除本地缓存后，请刷新小程序重新进入',
      type: 'modal',
      onOk() {
        clearStorage({
          success() {
            close()
            layerService.close(LayerKey.setting)
            Toast.open('清除成功')
          },
          fail() {
            Toast.open('清除失败')
          },
        })
      },
      onCancel() {
        close()
        layerService.close(LayerKey.setting)
      },
    })
  }

  return (
    <>
      <View minH-30vh maxH-70vh overflowScroll p-15 catchMove relative pt-100>
        <View toAround fixed bottom-30 left0 right0>
          <Button shape="round" block onClick={clear} style={{ margin: '10px' }}>
            清除本地缓存
          </Button>
        </View>
      </View>
      <View h-100 absolute top0 left0 right0 bgWhite toCenter>
        设置
      </View>
    </>
  )
}

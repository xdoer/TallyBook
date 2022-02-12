import { FC } from 'react'
import { Popup } from '@taroify/core'
import { View } from '@fower/taro'
import { popUpService } from '@/service/layer'

export const PopupContainer: FC<{}> = ({}) => {
  const { state, close } = popUpService.useLayer()
  const { visible, content } = state

  return (
    <View catchMove>
      <Popup open={visible} onClose={() => close()} placement="bottom" rounded>
        {content}
      </Popup>
    </View>
  )
}

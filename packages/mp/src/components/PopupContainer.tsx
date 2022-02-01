import { FC } from 'react'
import { Popup } from '@taroify/core'
import { LayerService } from '@/service/layerService'
import { View } from '@fower/taro'

export interface PopupContainerType {
  visible: boolean
  content?: JSX.Element | string
}

export const popUpService = new LayerService<PopupContainerType>({
  visible: false,
})

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

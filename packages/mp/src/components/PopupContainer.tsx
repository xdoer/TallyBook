import { FC } from 'react'
import { Popup, Backdrop } from '@taroify/core'
import { View } from '@fower/taro'
import { layerService } from '@/service/layerService'

export const PopupContainer: FC<{}> = ({}) => {
  const [state] = layerService.state.useState()

  return (
    <View catchMove>
      {state.map((i, idx) => {
        const { visible, model, key } = i
        const { content } = model

        const onClose = () => layerService.close(key)

        return (
          <Popup
            key={key}
            open={visible}
            onClose={onClose}
            placement="bottom"
            rounded
            style={{ zIndex: 1000 + idx + 1 }}
          >
            <Backdrop open={visible} closeable onClose={onClose} style={{ zIndex: 1000 + idx }} />
            {content}
          </Popup>
        )
      })}
    </View>
  )
}

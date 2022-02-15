import { FC } from 'react'
import { Popup, Backdrop } from '@taroify/core'
import { View } from '@fower/taro'
import { popUpService } from '@/service/layer'

export const PopupContainer: FC<{}> = ({}) => {
  const [state] = popUpService.state.useState()

  return (
    <View catchMove>
      {state.map((i, idx) => {
        const { visible, content, key } = i
        return (
          <Popup
            key={key}
            open={visible}
            onClose={() => popUpService.close(key)}
            placement="bottom"
            rounded
            style={{ zIndex: 1000 + idx + 1 }}
          >
            <Backdrop
              open={visible}
              closeable
              onClose={() => popUpService.close(key)}
              style={{ zIndex: 1000 + idx }}
            />
            {content}
          </Popup>
        )
      })}
    </View>
  )
}

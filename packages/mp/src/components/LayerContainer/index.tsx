import { FC, useEffect } from 'react'
import { View } from '@fower/taro'
import { layerService } from '@/service/layerService'
import { Popup } from './Popup'
import { Modal } from './Modal'

export const LayerContainer: FC<{}> = ({}) => {
  const [state] = layerService.state.useState()

  return (
    <View catchMove>
      {state.map((i) => {
        let Comp
        switch (i.model.type) {
          case 'modal':
            Comp = Modal
            break
          default:
            Comp = Popup
        }
        return <Comp key={i.key} config={i} />
      })}
    </View>
  )
}

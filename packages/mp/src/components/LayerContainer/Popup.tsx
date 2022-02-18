import { FC } from 'react'
import { Popup as BasePopup, Backdrop } from '@taroify/core'
import { Layer, layerService, LayerType } from '@/service/layerService'

interface PopupProps {
  index: number
  config: Layer<LayerType>
}

export const Popup: FC<PopupProps> = ({ config, index }) => {
  const { key, model, visible } = config
  const { content } = model

  function close() {
    layerService.close(key)
  }

  return (
    <BasePopup
      key={key}
      open={visible}
      onClose={close}
      placement="bottom"
      rounded
      style={{ zIndex: 1000 + index + 1 }}
    >
      <Backdrop open={visible} closeable onClose={close} style={{ zIndex: 1000 + index }} />
      {content}
    </BasePopup>
  )
}

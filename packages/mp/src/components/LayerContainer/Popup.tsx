import { FC } from 'react'
import { Popup as BasePopup, Backdrop } from '@taroify/core'
import { Layer, layerService, LayerType } from '@/service/layerService'

interface PopupProps {
  index: number
  config: Layer<LayerType>
}

export const Popup: FC<PopupProps> = ({ config, index }) => {
  const { key, model, visible } = config
  const { content, style } = model

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
      mountOnEnter={false}
      style={{ zIndex: 1000 + index + 1, maxHeight: '80%', ...style }}
    >
      <Backdrop open={visible} closeable onClose={close} style={{ zIndex: 1000 + index }} />
      <BasePopup.Close />
      {content}
    </BasePopup>
  )
}

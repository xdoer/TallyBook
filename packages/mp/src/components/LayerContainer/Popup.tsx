import { FC } from 'react'
import { Popup as BasePopup, Backdrop } from '@taroify/core'
import { Layer, layerService, LayerType } from '@/service/layerService'

interface PopupProps {
  config: Layer<LayerType>
}

export const Popup: FC<PopupProps> = ({ config }) => {
  const { key, model, visible, zIndex } = config
  const { content, style, closeable = true } = model

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
      style={{ zIndex, maxHeight: '80%', ...style }}
    >
      <Backdrop
        open={visible}
        closeable={closeable}
        onClose={close}
        style={{ zIndex: zIndex - 1 }}
      />
      {closeable && <BasePopup.Close />}
      {content}
    </BasePopup>
  )
}

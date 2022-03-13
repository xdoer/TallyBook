import { FC } from 'react'
import { Dialog, Button, Backdrop } from '@taroify/core'
import { Layer, layerService, LayerType } from '@/service/layerService'

interface ModalProps {
  config: Layer<LayerType>
}

export const Modal: FC<ModalProps> = ({ config }) => {
  const { key, model, visible, zIndex } = config
  const { title, content, okText, cancelText, onOk, onCancel, style } = model

  function close() {
    layerService.close(key)
  }

  return (
    <Dialog key={key} open={visible} onClose={close} style={{ zIndex, ...style }}>
      <Backdrop open={visible} closeable onClose={close} style={{ zIndex: zIndex - 1 }} />
      {title && <Dialog.Header>{title}</Dialog.Header>}
      <Dialog.Content>{content}</Dialog.Content>
      {(okText || cancelText) && (
        <Dialog.Actions theme="round">
          {cancelText && (
            <Button
              onClick={() => {
                onCancel?.()
                close()
              }}
            >
              {cancelText}
            </Button>
          )}
          {okText && (
            <Button
              onClick={() => {
                onOk?.()
                close()
              }}
            >
              {okText}
            </Button>
          )}
        </Dialog.Actions>
      )}
    </Dialog>
  )
}

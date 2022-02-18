import { FC } from 'react'
import { Dialog, Button, Backdrop } from '@taroify/core'
import { Layer, layerService, LayerType } from '@/service/layerService'

interface ModalProps {
  index: number
  config: Layer<LayerType>
}

export const Modal: FC<ModalProps> = ({ config, index }) => {
  const { key, model, visible } = config
  const { title, content, okText, cancelText, onOk, onCancel } = model

  function close() {
    layerService.close(key)
  }

  return (
    <Dialog key={key} open={visible} onClose={close} style={{ zIndex: 1000 + index + 1 }}>
      <Backdrop open={visible} closeable onClose={close} style={{ zIndex: 1000 + index }} />
      {title && <Dialog.Header>{title}</Dialog.Header>}
      <Dialog.Content>{content}</Dialog.Content>
      {(okText || cancelText) && (
        <Dialog.Actions theme="round">
          {cancelText && (
            <Button
              onClick={() => {
                onOk?.()
                close()
              }}
            >
              {cancelText}
            </Button>
          )}
          {okText && (
            <Button
              onClick={() => {
                onCancel?.()
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
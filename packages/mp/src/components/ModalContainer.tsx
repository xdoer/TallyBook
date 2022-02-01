import { FC } from 'react'
import { Dialog, Button } from '@taroify/core'
import { LayerService } from '@/service/layerService'
import { View } from '@fower/taro'

export interface ModalType {
  visible: boolean
  title?: string
  content?: JSX.Element | string
  okText?: string
  cancelText?: string
  onOk?(): void
  onCancel?(): void
}

export const modalService = new LayerService<ModalType>({
  visible: false,
  title: '标题',
  okText: '确认',
})

export const ModalContainer: FC<{}> = ({}) => {
  const { state, close } = modalService.useLayer()
  const { title, visible, content, okText, cancelText, onOk, onCancel } = state

  return (
    <View catchMove>
      <Dialog open={visible} onClose={close}>
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
    </View>
  )
}

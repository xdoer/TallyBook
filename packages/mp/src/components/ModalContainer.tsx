import { FC } from 'react'
import { Dialog, Button, Backdrop } from '@taroify/core'
import { View } from '@fower/taro'
import { modalService } from '@/service/layer'

export const ModalContainer: FC<{}> = ({}) => {
  const [state] = modalService.state.useState()

  return (
    <View catchMove>
      {state.map((i, idx) => {
        const { key, title, visible, content, okText, cancelText, onOk, onCancel } = i

        const close = () => modalService.close(key)

        return (
          <Dialog key={key} open={visible} onClose={close} style={{ zIndex: 1000 + idx + 1 }}>
            <Backdrop open={visible} closeable onClose={close} style={{ zIndex: 1000 + idx }} />
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
      })}
    </View>
  )
}

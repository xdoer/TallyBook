import { LayerService } from './base'

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

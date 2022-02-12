import { LayerService } from './base'

export interface PopupType {
  visible: boolean
  content?: JSX.Element | string
}

export const popUpService = new LayerService<PopupType>({
  visible: false,
})

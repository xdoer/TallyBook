import { LayerService } from './base'

export interface PopupType {
  content?: JSX.Element | string
}

export const popUpService = new LayerService<PopupType>({})

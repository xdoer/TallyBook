import { Request as BaseRequest } from '@prequest/miniprogram'

export interface Request extends BaseRequest {
  skipTokenCheck?: boolean
}

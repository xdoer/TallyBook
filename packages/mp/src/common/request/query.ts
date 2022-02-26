import { PreQuest } from '@prequest/miniprogram'
import { adapter } from './adapter'
import {
  loginMiddleware,
  typesGeneratorMiddleware,
  logMiddleware,
  parseMiddleware,
} from './middleware'

export const prequest = PreQuest.create(adapter, {
  baseURL: 'http://localhost:3000',
  method: 'GET',
})

prequest.use(logMiddleware).use(loginMiddleware).use(typesGeneratorMiddleware).use(parseMiddleware)

import { PreQuest } from '@prequest/core'
import { TallyBook } from '@tally-book/types'
import { adapter } from './adapter'
import { Request } from './type'
import {
  loginMiddleware,
  typesGeneratorMiddleware,
  logMiddleware,
  parseMiddleware,
} from './middleware'

const create = (init?: Request) =>
  PreQuest.create<Request, TallyBook.Response>(adapter as any, init)

export const prequest = create({
  baseURL: 'http://localhost:3000',
  method: 'GET',
})

prequest.use(logMiddleware).use(loginMiddleware).use(typesGeneratorMiddleware).use(parseMiddleware)

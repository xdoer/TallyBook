import { PreQuest } from '@prequest/core'
import { Request } from '@prequest/miniprogram'
import { PLATFORM } from '@/store/app'
import { adapter } from './adapter'
import { TallyBook } from '@tally-book/types'

export const prequest = PreQuest.create<Request, TallyBook.Response>(adapter as any, {
  baseURL: 'http://localhost:3000',
  method: 'GET',
})

prequest.use(async (ctx, next) => {
  await next()

  const platform = await PLATFORM.getState()

  if (platform.isLocal) return
  if (platform.isWxCloud) return

  // @ts-ignore
  const { statusCode, data } = ctx.response
  if (statusCode === 200) return (ctx.response = data as any)

  throw data
})

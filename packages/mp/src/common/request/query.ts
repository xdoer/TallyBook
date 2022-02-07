import { PreQuest } from '@prequest/core'
import { Request, Response } from '@prequest/miniprogram'
import { PLATFORM } from '@/store/app'
import { adapter } from './adapter'

export const prequest = PreQuest.create<Request, Response>(adapter as any, {
  baseURL: 'http://localhost:3000',
  method: 'GET',
})

prequest.use(async (ctx, next) => {
  await next()

  const platform = await PLATFORM.getState()

  if (platform.isLocal) return
  if (platform.isWxCloud) return

  const { statusCode, data } = ctx.response
  if (statusCode === 200) return (ctx.response = data as any)

  throw data
})

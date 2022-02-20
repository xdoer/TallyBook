import { PLATFORM } from '@/store'

export const parseMiddleware = async (ctx, next) => {
  await next()

  const platform = await PLATFORM.getState()

  if (platform.isLocal) return
  if (platform.isWxCloud) return

  // @ts-ignore
  const { statusCode, data } = ctx.response
  if (statusCode === 200) return (ctx.response = data as any)

  throw data
}

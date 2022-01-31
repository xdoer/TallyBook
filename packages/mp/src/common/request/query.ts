import Taro from '@tarojs/taro'
import { localRouter } from "@/server/router"
import { adapter as pqAdapter } from "./adapter"
import { PreQuest } from "@prequest/core"
import { Request, Response } from '@prequest/miniprogram'
import { PLATFORM } from "../constants"

function adapter(options: Request): Promise<Response> {
  if (PLATFORM.isServer) return pqAdapter(Taro.request)(options) as any

  return localRouter.call(options)
}

export const prequest = PreQuest.create<Request, Response>(adapter, {
  baseURL: 'http://localhost:3000',
  method: 'GET'
})

prequest.use(async (ctx, next) => {
  await next()

  const { statusCode, data } = ctx.response
  if (statusCode === 200) return ctx.response = data as any

  throw data
})

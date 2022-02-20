import Taro from '@tarojs/taro'
import { TallyBook } from '@tally-book/types'
import { create as createHttpAgent } from '@prequest/miniprogram'
import generatorMiddlewareWrapper from '@prequest/response-types-client'
import { Request } from '../type'

// ---------- 测试用 -------------

const httpAgent = createHttpAgent<Request, TallyBook.Response>(Taro.request, {
  path: 'http://localhost:10010/',
})

httpAgent.use(async (ctx, next) => {
  await next()
  const { statusCode, data } = ctx.response
  if (statusCode === 200) {
    // 请求需要返回真正的服务器数据
    // @ts-ignore
    ctx.response = data
  }
})

export const typesGeneratorMiddleware = generatorMiddlewareWrapper<Request, TallyBook.Response>({
  enable: false,
  httpAgent,
  outPutDir: './api-types',
  typesGeneratorConfig(req, res) {
    const { path } = req

    if (!path) throw new Error('path not found')

    const outPutName = path.replace(/.*\/(\w+)/, (_, __) => __)
    const interfaceName = outPutName.replace(/^[a-z]/, (g) => g.toUpperCase())

    return {
      data: res,
      outPutName,
      interfaceName,
      overwrite: false,
    }
  },
})

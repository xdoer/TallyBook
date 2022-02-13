import { PreQuest } from '@prequest/core'
import { Request } from '@prequest/miniprogram'
import Lock from '@prequest/lock'
import { PLATFORM } from '@/store/app'
import { adapter } from './adapter'
import { TallyBook } from '@tally-book/types'
import { loginStore } from '@/store'
import { popUpService } from '@/service/layer'
import { Auth } from '@/components/Auth'
import { apiService } from '@/service/apiService'

export const prequest = PreQuest.create<Request & { skipTokenCheck: boolean }, TallyBook.Response>(
  adapter as any,
  {
    baseURL: 'http://localhost:3000',
    method: 'GET',
  },
)

const lock = new Lock({
  async getValue() {
    return loginStore.getState()
  },
  setValue(token) {
    loginStore.setState(token)
  },
  clearValue() {
    loginStore.setState(undefined as any)
  },
})
const wrapper = Lock.createLockWrapper(lock)

prequest
  .use(async (ctx, next) => {
    if (ctx.request.skipTokenCheck) return next()
    const token = await wrapper(login)
    // TODO: Server 模式需要设置 token
    // ctx.request.header = ctx.request.header || {}
    // ctx.request.header['Authorization'] = `bearer ${token}`
    await next()
  })
  .use(async (ctx, next) => {
    await next()

    const platform = await PLATFORM.getState()

    if (platform.isLocal) return
    if (platform.isWxCloud) return

    // @ts-ignore
    const { statusCode, data } = ctx.response
    if (statusCode === 200) return (ctx.response = data as any)

    throw data
  })

async function login() {
  const { success, result } = await apiService.login()

  if (success) return result

  return new Promise((resolve) => {
    popUpService.open(<Auth success={() => login().then(resolve)} />)
  })
}

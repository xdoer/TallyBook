import Lock from '@prequest/lock'
import { loginStore } from '@/store'
import { layerService } from '@/service/layerService'
import { Auth } from '@/components/Auth'
import { apiService } from '@/service/apiService'
import { LayerKey } from '../../constants'

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

export const loginMiddleware = async (ctx, next) => {
  if (ctx.request.skipTokenCheck) return next()
  const token = await wrapper(login)
  // TODO: Server 模式需要设置 token
  // ctx.request.header = ctx.request.header || {}
  // ctx.request.header['Authorization'] = `bearer ${token}`
  await next()
}

async function login() {
  const { success, result } = await apiService.login()

  if (success) return result

  return new Promise((resolve) => {
    layerService.open(
      {
        content: <Auth success={() => login().then(resolve)} />,
        closeable: false,
      },
      LayerKey.auth,
    )
  })
}

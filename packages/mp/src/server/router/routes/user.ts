import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { userService } from '../../service'

const router = new Router()

router
  .use(ApiName.Login, () => {
    return userService.login()
  })
  .use(ApiName.Register, (data) => {
    return userService.register(data as any)
  })

export const userRouter = router

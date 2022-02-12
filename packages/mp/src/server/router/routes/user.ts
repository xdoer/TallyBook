import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { userService } from '../../service'

const router = new Router()

router
  .use(ApiName.Login, () => {
    return userService.login()
  })
  .use(ApiName.CreateUser, (data) => {
    return userService.createUser(data as any)
  })

export const userRouter = router

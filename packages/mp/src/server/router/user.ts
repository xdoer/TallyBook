import { Router } from './Base'
import { userService } from '../service'

const router = new Router()

router
  .use('/login', () => {
    return userService.login()
  })
  .use('/user', () => {
    return userService.getUsers()
  })
  .use('/createUser', (options) => {
    const { data } = options
    return userService.addUser(data as any)
  })

export const userRouter = router

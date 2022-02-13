import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { userService } from '../../service'

const router = new Router()

router.use(ApiName.Login, userService.login).use(ApiName.Register, userService.register)

export const userRouter = router

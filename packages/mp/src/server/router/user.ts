import { Router } from "./Base";
import { userService } from "../service";

const router = new Router()

router
  .use('/user', () => {
    return userService.getUsers()
  })

export const userRouter = router

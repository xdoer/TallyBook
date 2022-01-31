import { localRouter } from './Base'
import { userRouter } from './user'
import { billRouter } from './bill'

localRouter
  .merge(userRouter.routes())
  .merge(billRouter.routes())

export { localRouter }
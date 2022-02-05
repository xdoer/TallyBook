import { localRouter } from './Base'
import { userRouter } from './routes/user'
import { billRouter } from './routes/bill'

localRouter.merge(userRouter.routes()).merge(billRouter.routes())

export { localRouter }

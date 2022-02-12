import { localRouter } from './Base'
import { userRouter } from './routes/user'
import { billRouter } from './routes/bill'
import { assetRouter } from './routes/asset'

localRouter.merge(userRouter.routes()).merge(billRouter.routes()).merge(assetRouter.routes())

export { localRouter }

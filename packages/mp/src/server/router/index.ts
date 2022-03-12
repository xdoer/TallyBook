import { localRouter } from './Base'
import { userRouter } from './routes/user'
import { billRouter } from './routes/bill'
import { assetRouter } from './routes/asset'
import { statisticRouter } from './routes/statistics'

localRouter
  .merge(userRouter.routes())
  .merge(billRouter.routes())
  .merge(assetRouter.routes())
  .merge(statisticRouter.routes())

export { localRouter }

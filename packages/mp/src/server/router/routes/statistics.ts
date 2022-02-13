import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { billService } from '../../service'

const router = new Router()

router.use(ApiName.Statistics, (options) => {
  return billService.getBill(options)
})

export const statisticRouter = router

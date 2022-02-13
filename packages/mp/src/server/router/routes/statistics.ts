import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { billService } from '../../service'

const router = new Router()

router.use(ApiName.Statistics, billService.getBill)

export const statisticRouter = router

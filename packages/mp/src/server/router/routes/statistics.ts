import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { statisticsService } from '@/server/service/statistics'

const router = new Router()

router.use(ApiName.Statistics, statisticsService.statistics)

export const statisticRouter = router

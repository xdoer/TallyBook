import { Router } from './Base'
import { billService } from '../service'

const router = new Router()

router.use('/bills', (options) => {
  return billService.getBills(options)
})

export const billRouter = router

import { Router } from './Base'
import { billService } from '../service'

const router = new Router()

router
  .use('/bills', (options) => {
    return billService.getBills(options)
  })
  .use('/billTypes', async () => {
    return billService.getBillTypes()
  })
  .use('/createBill', async (options) => {
    return billService.createBill(options)
  })

export const billRouter = router

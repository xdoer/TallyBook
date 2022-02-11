import { Router } from '../Base'
import { billService } from '../../service'

const router = new Router()

router
  .use('/getBills', (options) => {
    return billService.getBills(options)
  })
  .use('/getBillTypes', async () => {
    return billService.getBillTypes()
  })
  .use('/createBill', async (options) => {
    return billService.createBill(options)
  })

export const billRouter = router

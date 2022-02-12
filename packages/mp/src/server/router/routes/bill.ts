import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { billService } from '../../service'

const router = new Router()

router
  .use(ApiName.GetBills, (options) => {
    return billService.getBills(options)
  })
  .use(ApiName.GetBillTypes, async () => {
    return billService.getBillTypes()
  })
  .use(ApiName.CreateBill, async (options) => {
    return billService.createBill(options)
  })

export const billRouter = router

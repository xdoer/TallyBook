import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { billService } from '../../service'

const router = new Router()

router
  .use(ApiName.GetBill, billService.getBill)
  .use(ApiName.RemoveBill, billService.removeBill)
  .use(ApiName.GetBills, billService.getBills)
  .use(ApiName.GetBillTypes, billService.getBillTypes)
  .use(ApiName.CreateBill, billService.createBill)
  .use(ApiName.UpdateBill, billService.updateBill)

export const billRouter = router

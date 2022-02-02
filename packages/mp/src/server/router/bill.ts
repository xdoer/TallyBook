import { Router } from './Base'
import { billService } from '../service'
import { success } from './util'

const router = new Router()

router
  .use('/bills', (options) => {
    return billService.getBills(options)
  })
  .use('/billTypes', async () => {
    const data = await billService.getBillTypes()
    return success(data)
  })

export const billRouter = router

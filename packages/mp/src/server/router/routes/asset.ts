import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { assetService } from '../../service'

const router = new Router()

router.use(ApiName.GetAssets, () => {
  return assetService.getAssets()
})

export const assetRouter = router

import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { assetService } from '../../service'

const router = new Router()

router
  .use(ApiName.CreateAsset, assetService.createAsset)
  .use(ApiName.RemoveAsset, assetService.removeAsset)
  .use(ApiName.GetAssets, assetService.getAssets)
  .use(ApiName.GetAsset, assetService.getAsset)
  .use(ApiName.GetAsset, assetService.getAsset)
  .use(ApiName.UpdateAsset, assetService.updateAsset)

export const assetRouter = router

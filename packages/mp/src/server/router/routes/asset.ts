import { ApiName } from '@tally-book/model'
import { Router } from '../Base'
import { assetService } from '../../service'

const router = new Router()

router
  .use(ApiName.CreateAsset, (data) => {
    return assetService.createAsset(data)
  })
  .use(ApiName.RemoveAsset, (data) => {
    return assetService.removeAsset(data)
  })
  .use(ApiName.GetAssets, () => {
    return assetService.getAssets()
  })
  .use(ApiName.GetAsset, (data) => {
    return assetService.getAsset(data)
  })

export const assetRouter = router

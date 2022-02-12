import { Asset } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'

class AssetService {
  // 获取资产
  async getAssets(): Promise<TallyBook.GetAssets.Res[]> {
    const assetDB = await dataBaseService.asset()
    const types: Asset[] = (await assetDB.get()) || []
    return types
  }
}

export const assetService = new AssetService()

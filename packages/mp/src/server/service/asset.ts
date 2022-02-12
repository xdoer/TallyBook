import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { ErrorCode, MPError } from '@/common/Error'

class AssetService {
  // 获取资产列表
  async getAsset(opt: TallyBook.GetAsset.Args): Promise<TallyBook.GetAsset.Res> {
    const { id } = opt
    const assetDB = await dataBaseService.asset()
    const assets = await assetDB.get()
    const asset = assets.find((i) => i.id === id)!

    if (!asset) throw new MPError('no asset', ErrorCode.Params)

    return asset
  }

  async getAssets(): Promise<TallyBook.GetAssets.Res> {
    const assetDB = await dataBaseService.asset()
    return await assetDB.get()
  }
}

export const assetService = new AssetService()

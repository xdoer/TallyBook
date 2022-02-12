import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { ErrorCode, MPError } from '@/common/Error'

class AssetService {
  // 获取资产详情
  async getAsset(opt: TallyBook.GetAsset.Args): Promise<TallyBook.GetAsset.Res> {
    const { id } = opt
    const assetDB = await dataBaseService.asset()
    const assets = await assetDB.get()
    const asset = assets.find((i) => i.id === id)!

    if (!asset) throw new MPError('no asset', ErrorCode.Params)

    return asset
  }

  // 删除资产
  async removeAsset(req: TallyBook.RemoveAsset.Args): Promise<TallyBook.RemoveAsset.Res> {
    const assetDB = await dataBaseService.asset()
    const assets = await assetDB.get()

    const asset = assets.find((i) => i.id === req.id)
    if (asset?.isDefault) throw new MPError('默认资产不能删除')
    if (!assets.length) throw new MPError('必须保留一个资产账户')

    await assetDB.remove({ id: req.id })

    return true
  }

  // 获取资产列表
  async getAssets(): Promise<TallyBook.GetAssets.Res> {
    const assetDB = await dataBaseService.asset()
    return await assetDB.get()
  }
}

export const assetService = new AssetService()

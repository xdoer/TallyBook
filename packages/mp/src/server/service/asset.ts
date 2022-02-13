import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { ErrorCode, MPError } from '@/common/Error'

class AssetService {
  // 获取资产详情
  async createAsset(opt: TallyBook.CreateAsset.Args): Promise<TallyBook.CreateAsset.Res> {
    const assetDB = await dataBaseService.asset()

    // 如果设置为默认
    if (opt.isDefault) {
      const assets = await assetDB.get()
      const asset = assets.find((asset) => asset.isDefault)
      await assetDB.update({ id: asset!.id }, { isDefault: false })
    }

    assetDB.add({ ...opt, delete: false })
    return true
  }

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

    await assetDB.update({ id: asset!.id }, { delete: true })

    return true
  }

  // 获取资产列表
  async getAssets(): Promise<TallyBook.GetAssets.Res> {
    const assetDB = await dataBaseService.asset()
    const assets = await assetDB.get()

    return assets.filter((asset) => !asset.delete)
  }
}

export const assetService = new AssetService()

import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { ErrorCode, MPError } from '@/common/Error'

class AssetService {
  // 获取资产详情
  async createAsset(opt: TallyBook.CreateAsset.Args, token): Promise<TallyBook.CreateAsset.Res> {
    const assetDB = await dataBaseService.asset()
    const assets = await assetDB.get()

    // 如果设置为默认
    if (opt.isDefault && assets.length) {
      const asset = assets.find((asset) => asset.isDefault)
      await assetDB.update({ id: asset!.id }, { isDefault: false })
    }

    assetDB.add({ ...opt, delete: false, cost: 0, userId: token.user.id })
    return true
  }

  // 获取资产详情
  async getAsset(opt: TallyBook.GetAsset.Args): Promise<TallyBook.GetAsset.Res> {
    const { id } = opt
    const assetDB = await dataBaseService.asset()
    const asset = await assetDB.getOne(id)

    if (!asset) throw new MPError('no asset', ErrorCode.Params)

    return asset
  }

  // 删除资产
  async removeAsset(req: TallyBook.RemoveAsset.Args): Promise<TallyBook.RemoveAsset.Res> {
    const assetDB = await dataBaseService.asset()
    const asset = await assetDB.getOne(req.id)

    if (asset?.isDefault) throw new MPError('默认资产不能删除')

    await assetDB.update({ id: asset!.id }, { delete: true })

    return true
  }

  // 获取资产列表
  async getAssets(): Promise<TallyBook.GetAssets.Res> {
    const assetDB = await dataBaseService.asset()
    return assetDB.get({ delete: false })
  }
}

export const assetService = new AssetService()

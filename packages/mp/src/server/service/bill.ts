import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { ErrorCode, MPError } from '@/common/Error'
import { getTime } from '@/common/utils'

class BillService {
  // 账单详情
  async getBill(req: TallyBook.GetBill.Args): Promise<TallyBook.GetBill.Res> {
    const billDB = await dataBaseService.bill()
    const bill = await billDB.getOne(req.id)

    if (!bill) throw new MPError('no bill', ErrorCode.Params)

    const typeDB = await dataBaseService.billType()
    const accountDB = await dataBaseService.account()
    const assetDB = await dataBaseService.asset()

    const { typeId, accountId, assetId } = bill

    return {
      ...bill,
      type: await typeDB.getOne(typeId),
      account: await accountDB.getOne(accountId),
      asset: await assetDB.getOne(assetId),
    }
  }

  // 删除账单
  async removeBill(req: TallyBook.RemoveBill.Args): Promise<TallyBook.RemoveBill.Res> {
    const billDB = await dataBaseService.bill()
    const assetDB = await dataBaseService.asset()
    const billTypeDB = await dataBaseService.billType()

    const { assetId, money, typeId } = await billDB.getOne(req.id)

    const billType = await billTypeDB.getOne(typeId)
    const asset = await assetDB.getOne(assetId)

    if (billType.type === 'income') {
      await assetDB.update(assetId, { cost: asset.cost + money })
    }
    if (billType.type === 'outcome') {
      await assetDB.update(assetId, { cost: asset.cost - money })
    }

    await billDB.remove({ id: req.id })
    return true
  }

  // 首页接口
  async getBills(req: TallyBook.GetBills.Args): Promise<TallyBook.GetBills.Res> {
    const { time = {} } = req
    const billDB = await dataBaseService.bill()
    const typeDB = await dataBaseService.billType()

    const bills = await billDB.get()
    const types = await typeDB.get()

    const data = bills
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .filter((a) => {
        const d = getTime(new Date(Number(a.time)))
        return Object.keys(time).every((i) => time[i] === d[i])
      })
      .map((bill) => {
        return {
          ...bill,
          type: types.find((t) => t.id === bill.typeId)!,
        }
      })

    return data
  }

  // 添加账单
  async createBill(args: TallyBook.CreateBill.Args, token): Promise<TallyBook.CreateBill.Res> {
    const { accountId, assetId, remark = '', typeId, money, time } = args
    const { id: userId } = token.user

    const bills = await dataBaseService.bill()
    const assetDB = await dataBaseService.asset()
    const typeDB = await dataBaseService.billType()
    const accountDB = await dataBaseService.account()

    const asset = await assetDB.getOne(assetId ? assetId : { isDefault: true })
    const account = await accountDB.getOne(accountId ? accountId : { isDefault: true })
    const billType = await typeDB.getOne(typeId)

    if (billType.type === 'income') {
      await assetDB.update(asset.id, { cost: asset.cost - money })
    }

    if (billType.type === 'outcome') {
      await assetDB.update(asset.id, { cost: asset.cost + money })
    }

    const newBill = await bills.add({
      money,
      time,
      typeId,
      accountId: account.id,
      assetId: asset.id,
      userId,
      remark,
    })

    return {
      ...newBill,
      type: billType,
    }
  }

  // 添加账单
  async updateBill(args: TallyBook.UpdateBill.Args, token): Promise<TallyBook.UpdateBill.Res> {
    const { id, accountId, assetId, remark = '', typeId, money, time } = args
    const { id: userId } = token.user

    const bills = await dataBaseService.bill()
    const assetDB = await dataBaseService.asset()
    const typeDB = await dataBaseService.billType()
    const accountDB = await dataBaseService.account()

    const asset = await assetDB.getOne(assetId ? assetId : { isDefault: true })
    const account = await accountDB.getOne(accountId ? accountId : { isDefault: true })
    const billType = await typeDB.getOne(typeId)

    if (billType.type === 'income') {
      await assetDB.update(asset.id, { cost: asset.cost - money })
    }

    if (billType.type === 'outcome') {
      await assetDB.update(asset.id, { cost: asset.cost + money })
    }

    const newBill = await bills.update(id, {
      money,
      time,
      typeId,
      accountId: account.id,
      assetId: asset.id,
      userId,
      remark,
    })

    return {
      ...newBill,
      type: billType,
    }
  }

  // 获取类型
  async getBillTypes(): Promise<TallyBook.GetBillTypes.Res[]> {
    const billTypesDB = await dataBaseService.billType()
    const types: BillType[] = await billTypesDB.get()

    return types.reduce((t, c) => {
      const { type } = c
      const idx = t.findIndex((i) => i.type === type)
      if (idx !== -1) {
        t[idx].grid.push(c)
      } else {
        t.push({ type, grid: [] })
      }
      return t
    }, [] as TallyBook.GetBillTypes.Res[])
  }
}

export const billService = new BillService()

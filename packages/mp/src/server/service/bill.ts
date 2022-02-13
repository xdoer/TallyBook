import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { groupBy } from 'lodash-es'
import { ErrorCode, MPError } from '@/common/Error'
import { getTime } from '@/common/utils'

class BillService {
  // 账单详情
  async getBill(req: TallyBook.GetBill.Args): Promise<TallyBook.GetBill.Res> {
    const billDB = await dataBaseService.bill()
    const bills = await billDB.get()

    const bill = bills.find((bill) => bill.id === req.id)

    if (!bill) throw new MPError('no bill', ErrorCode.Params)

    const typeDB = await dataBaseService.billType()
    const accountDB = await dataBaseService.account()
    const assetDB = await dataBaseService.asset()

    const types = await typeDB.get()
    const accounts = await accountDB.get()
    const assets = await assetDB.get()

    const { typeId, accountId, assetId } = bill

    return {
      ...bill,
      type: types.find((type) => type.id === typeId)!,
      account: accounts.find((account) => account.id === accountId)!,
      asset: assets.find((asset) => asset.id === assetId)!,
    }
  }

  // 删除账单
  async removeBill(req: TallyBook.RemoveBill.Args): Promise<TallyBook.RemoveBill.Res> {
    const billDB = await dataBaseService.bill()
    const assetDB = await dataBaseService.asset()
    const billTypeDB = await dataBaseService.billType()

    const bills = await billDB.get({ id: req.id })
    const { assetId, money, typeId } = bills[0]

    const types = await billTypeDB.get({ id: typeId })
    const assets = await assetDB.get({ id: assetId })

    const { type } = types[0]

    if (type === 'income') {
      await assetDB.update({ id: assetId }, { money: assets[0].money - money })
    }
    if (type === 'outcome') {
      await assetDB.update(
        { id: assetId },
        { money: assets[0].money + money, cost: assets[0].cost + money },
      )
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
  async createBill(bill: TallyBook.CreateBill.Args): Promise<TallyBook.CreateBill.Res> {
    const bills = await dataBaseService.bill()
    const assetDB = await dataBaseService.asset()

    const newBill = await bills.add(bill as any)

    const assets = await assetDB.get({ id: bill.assetId })
    const typeDB = await dataBaseService.billType()
    const types = await typeDB.get({ id: bill.typeId })

    const { type } = types[0]

    if (type === 'income') {
      // 收入的话，加资产总额
      await assetDB.update({ id: bill.assetId }, { money: assets[0].money + bill.money })
    }
    if (type === 'outcome') {
      // 支出扣消费预算
      await assetDB.update({ id: bill.assetId }, { cost: assets[0].cost + bill.money })
    }

    return {
      ...newBill,
      type: types.find((t) => t.id === bill.typeId)!,
    }
  }

  // 获取类型
  async getBillTypes(): Promise<TallyBook.GetBillTypes.Res[]> {
    const billTypesDB = await dataBaseService.billType()
    const types: BillType[] = (await billTypesDB.get()) || []

    const group = groupBy(types, 'type')
    const result: TallyBook.GetBillTypes.Res[] = [
      {
        type: 'outcome',
        value: '支出',
        grid: group.outcome,
      },
      {
        type: 'income',
        value: '收入',
        grid: group.income,
      },
    ]

    return result
  }
}

export const billService = new BillService()

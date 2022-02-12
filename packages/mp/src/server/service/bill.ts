import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import { groupBy } from 'lodash-es'
import { ErrorCode, MPError } from '@/common/Error'

class BillService {
  // 账单详情
  async getBill(req: TallyBook.GetBill.Args): Promise<TallyBook.GetBill.Res> {
    const { id } = req
    const billDB = await dataBaseService.bill()
    const bills = await billDB.get()

    const bill = bills.find((bill) => bill.id === id)

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

  // 首页接口
  async getBills(req: TallyBook.GetBills.Args): Promise<TallyBook.GetBills.Res> {
    const { pageNo, pageSize } = req
    const billDB = await dataBaseService.bill()
    const typeDB = await dataBaseService.billType()

    const bills = await billDB.get()
    const types = await typeDB.get()

    const data = bills
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .slice(pageNo * pageSize, (pageNo + 1) * pageSize)
      .map((bill) => {
        return {
          ...bill,
          type: types.find((t) => t.id === bill.typeId)!,
        }
      })

    return {
      hasNext: (pageNo + 1) * pageSize < bills.length,
      list: data,
      total: bills.length,
    }
  }

  // 添加账单
  async createBill(bill: TallyBook.CreateBill.Args): Promise<TallyBook.CreateBill.Res> {
    const bills = await dataBaseService.bill()
    const newBill = await bills.add(bill as any)

    const typeDB = await dataBaseService.billType()
    const types = await typeDB.get()

    return {
      ...newBill,
      type: types.find((t) => t.id === bill.typeId)!,
    }
  }

  // 获取类型
  async getBillTypes() {
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

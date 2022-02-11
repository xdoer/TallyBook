import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import _, { groupBy } from 'lodash-es'

class BillService {
  // 首页接口
  async getBills(req: TallyBook.GetBills.Args): Promise<TallyBook.GetBills.Res> {
    const { pageNo, pageSize } = req
    const billDB = await dataBaseService.bill()
    const bills = await billDB.get()

    const data = bills
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .slice(pageNo * pageSize, (pageNo + 1) * pageSize)

    return {
      hasNext: (pageNo + 1) * pageSize < bills.length,
      list: data,
      total: bills.length,
    }
  }

  // 添加账单
  async createBill(bill: TallyBook.CreateBillOptions.Args) {
    const bills = await dataBaseService.bill()
    return bills.add(bill as any)
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

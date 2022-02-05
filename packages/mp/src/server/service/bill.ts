import { formatDate } from '@/common/utils'
import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'
import _, { groupBy } from 'lodash-es'

class BillService {
  // 首页接口
  async getBills(req: any) {
    const { pageStart, pageSize } = req
    const billDB = await dataBaseService.bill()
    const bills = await billDB.get()

    return _.chain(bills)
      .slice(pageStart)
      .take(pageSize)
      .groupBy(({ createdAt }) => formatDate(new Date(createdAt), 'yyyy-MM-dd'))
      .mapValues((v, k) => ({ date: k, list: v }))
      .values()
      .value()
  }

  // 添加账单
  async createBill(bill: TallyBook.createBillOptions) {
    const bills = await dataBaseService.bill()
    return bills.add(bill as any)
  }

  // 获取类型
  async getBillTypes() {
    const billTypesDB = await dataBaseService.billType()
    const types: BillType[] = (await billTypesDB.get()) || []

    const group = groupBy(types, 'type')
    const result: TallyBook.billTypes[] = [
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

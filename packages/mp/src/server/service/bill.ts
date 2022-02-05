import { formatDate } from '@/common/utils'
import { BillType } from '@tally-book/model'
import { dataBaseService } from '../db'
import { TallyBook } from '@tally-book/types'

class BillService {
  // 首页接口
  async getBills({ year, month, date }: any) {
    const bills = await dataBaseService.bill()

    return bills.get().then((bills) => {
      return bills.filter((bill) => {
        const { createdAt } = bill
        const createDate = new Date(createdAt)

        if (year) return year === formatDate(createDate, 'yyyy')
        if (month) return month === formatDate(createDate, 'yyyy-MM')
        if (date) return month === formatDate(createDate, 'yyyy-MM-dd')

        return true
      })
    })
  }

  // 添加账单
  async createBill(bill: TallyBook.createBillOptions) {
    const { id: typeId, ...rest } = bill
    const bills = await dataBaseService.bill()
    return bills.add({ typeId, ...rest })
  }

  // 获取类型
  async getBillTypes() {
    const billTypesDB = await dataBaseService.billType()
    const types: BillType[] = <any>await billTypesDB.get() || []

    const result: TallyBook.billTypes[] = [
      {
        type: 'outcome',
        value: '支出',
        grid: [],
      },
      {
        type: 'income',
        value: '收入',
        grid: [],
      },
    ]

    return types.reduce((result, cur) => {
      const { type } = cur
      const idx = result.findIndex((i) => i.type === type)
      result[idx].grid.push(cur)
      return result
    }, result)
  }
}

export const billService = new BillService()

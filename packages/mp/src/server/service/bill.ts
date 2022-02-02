import { formatDate } from '@/common/utils'
import { Bill, BillType } from '@/model'
import { dataBaseService } from '../db'

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
  async setBill(bill: Bill) {
    const bills = await dataBaseService.bill()
    return bills.add(bill)
  }

  async getBillTypes() {
    const billTypesDB = await dataBaseService.billType()
    const types: BillType[] = <any>await billTypesDB.get() || []

    const result = [
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

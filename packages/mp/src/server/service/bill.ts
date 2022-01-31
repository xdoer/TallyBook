import { formatDate } from '@/common/utils'
import { Bill } from '@/model'
import { dataBaseService } from '../db'

class BillService {
  // 首页接口
  async getBills({ year, month, date }: any) {
    return dataBaseService.bill.get().then(bills => {
      return bills.filter(bill => {
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
  setBill(bill: Bill) {
    return dataBaseService.bill.add(bill)
  }

  //

}

export const billService = new BillService()


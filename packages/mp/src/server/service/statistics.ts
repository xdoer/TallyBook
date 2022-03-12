import { TallyBook } from '@tally-book/types'
import { dataBaseService } from '../db'

class StatisticsService {
  async statistics(options: TallyBook.Statistics.Args): Promise<TallyBook.Statistics.Res> {
    const billDB = await dataBaseService.bill()
    const billTypeDB = await dataBaseService.billType()
    const assetDB = await dataBaseService.asset()

    const _bills = await billDB.get()
    const _assets = await assetDB.get()
    const _billTypes = await billTypeDB.get()
    const { time } = options

    // 总预算
    const budget = _assets.reduce((_, __) => _ + __.budget, 0)

    const bills = _bills.filter((bill) => {
      const t = new Date(bill.time)
      const year = t.getFullYear()
      const month = t.getMonth()

      if (time.month) return time.year === year && time.month === month

      return time.year === year
    })

    const { money, cost } = bills.reduce(
      (t, c) => {
        const _ = _billTypes.find((i) => i.id === c.typeId)
        if (_?.type === 'outcome') t.money -= c.money
        if (_?.type === 'income') t.cost += c.money
        return t
      },
      { money: 0, cost: 0 },
    )

    return { money, cost, budget: budget + money + cost }
  }
}

export const statisticsService = new StatisticsService()

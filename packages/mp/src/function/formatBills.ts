import { TallyBook } from '@tally-book/types'
import { formatDate } from '@xdoer/x'
import { groupBy } from 'lodash-es'

interface RenderBillList {
  date: string
  money: number
  list: TallyBook.GetBills.Res
}

export function formatBills(bills: TallyBook.GetBills.Res, data: RenderBillList[] = []) {
  let newData = [...data]
  const x = groupBy(bills, (i) => formatDate(new Date(i.createdAt!), 'yyyy-MM-dd'))
  const find = newData.find((i) => x[i.date])
  if (find) {
    const newList = x[find.date]
    const money = getMoney(newList)
    find.list = find.list.concat(newList)
    find.list.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    find.money += money
  } else {
    newData = newData.concat(
      Object.keys(x).map((i) => ({
        date: i,
        money: getMoney(x[i]),
        list: x[i],
      })),
    )
  }

  return newData
}

export function getMoney(list: TallyBook.GetBills.BillRes[] = [], type?: 'income' | 'outcome') {
  return list.reduce((t, c) => {
    if (type) {
      if (c.type.type === type) return t + c.money
      return t
    }

    if (c.type.type === 'income') return t + c.money
    if (c.type.type === 'outcome') return t - c.money
    return t
  }, 0)
}

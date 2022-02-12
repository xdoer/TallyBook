import { PickAttr } from '@tally-book/types'
import { TallyBook } from '@tally-book/types'
import { formatDate } from '@/common/utils'
import { groupBy } from 'lodash-es'
import { RenderBillList } from '@/store'

export function formatBills(
  bills: PickAttr<TallyBook.GetBills.Res, 'list'>,
  data: RenderBillList[] = [],
) {
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

export function getMoney(list: TallyBook.GetBills.BillRes[] = []) {
  return list.reduce((t, c) => {
    if (c.type.type === 'income') return t - c.money
    if (c.type.type === 'outcome') return t + c.money
    return t
  }, 0)
}

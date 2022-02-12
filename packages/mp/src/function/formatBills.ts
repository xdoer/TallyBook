import { PickAttr } from '@/types'
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
    const money = newList.reduce((t, c) => t + c.money, 0)
    find.list = find.list.concat(newList)
    find.list.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    find.money += money
  } else {
    newData = newData.concat(
      Object.keys(x).map((i) => ({
        date: i,
        money: x[i].reduce((t, c) => t + c.money, 0),
        list: x[i],
      })),
    )
  }

  return newData
}

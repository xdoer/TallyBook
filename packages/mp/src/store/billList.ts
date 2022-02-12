import { PickAttr } from '@tally-book/types'
import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export interface RenderBillList {
  date: string
  money: number
  list: PickAttr<TallyBook.GetBills.Res, 'list'>
}

export const billListStore = new StateBus<RenderBillList[]>([])

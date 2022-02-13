import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export interface RenderBillList {
  date: string
  money: number
  list: TallyBook.GetBills.Res
}

export const billListStore = new StateBus<RenderBillList[]>([])

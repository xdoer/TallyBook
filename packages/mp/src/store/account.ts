import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export const accountStore = new StateBus<TallyBook.Account>()

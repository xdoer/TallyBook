import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export const userStore = new StateBus<TallyBook.User>()

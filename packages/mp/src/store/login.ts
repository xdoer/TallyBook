import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export const loginStore = new StateBus<TallyBook.Login.Res>()

import { TallyBook } from '@tally-book/types'
import StateBus from '@xdoer/state-bus'

export const assetStore = new StateBus<TallyBook.Asset>()

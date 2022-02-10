import { StorageState } from '@/common/StorageState'
import { TallyBook } from '@tally-book/types'

export const accountStore = new StorageState<TallyBook.Account>('account')

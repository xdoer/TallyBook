import { StorageState } from '@/common/StorageState'
import { TallyBook } from '@tally-book/types'

export const userStore = new StorageState<TallyBook.User>('user')

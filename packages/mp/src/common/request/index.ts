import createQueryHook from './use-request'
import { TallyBook } from '@tally-book/types'
import { prequest } from './query'
import { Request } from './type'

export const useQuery = createQueryHook<Request, TallyBook.Response>(prequest)

export * from './query'
export * from './type'

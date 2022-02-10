import { Request } from '@prequest/miniprogram'
import createQueryHook from '@prequest/use-request'
import { TallyBook } from '@tally-book/types'
import { prequest } from './query'

export const useQuery = createQueryHook<Request, TallyBook.Response>(prequest)
export * from './query'

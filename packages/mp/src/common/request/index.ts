import { Request, Response } from '@prequest/miniprogram'
import createQueryHook from '@prequest/use-request'
import { prequest } from './query'

export const useQuery = createQueryHook<Request, Response>(prequest)
export * from './query'

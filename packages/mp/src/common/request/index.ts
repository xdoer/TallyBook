import { Request, Response } from '@prequest/miniprogram'
import requestHook from './use-query'
import { prequest } from './query'

export const useQuery = requestHook<Request, Response>(prequest)
export * from './query'

import requestHook from './use-query'
import { prequest } from './query'

export const useQuery = requestHook<any, any>(prequest)

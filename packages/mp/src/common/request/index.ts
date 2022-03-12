import createQueryHook from './use-request'
import { prequest } from './query'

export const useQuery = createQueryHook(prequest)

export * from './query'

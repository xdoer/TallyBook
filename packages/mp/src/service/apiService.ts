import { prequest } from '@/common/request'
import { TallyBook } from '@tally-book/types'

class ApiService {
  createUser(data: any) {
    return prequest.post('/createUser', { data })
  }

  createBill(data: TallyBook.createBillOptions) {
    return prequest.post('/createBill', { data })
  }
}

export const apiService = new ApiService()

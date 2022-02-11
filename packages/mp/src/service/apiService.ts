import { prequest } from '@/common/request'
import { TallyBook } from '@tally-book/types'

class ApiService {
  login() {
    return prequest.get<TallyBook.Response<TallyBook.Login.Res>>('/login')
  }

  createUser(data: any) {
    return prequest.post('/createUser', { data })
  }

  createBill(data) {
    return prequest.post<TallyBook.Response<TallyBook.CreateBillOptions.Res>>('/createBill', {
      data,
    })
  }
}

export const apiService = new ApiService()

import { prequest } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

class ApiService {
  login() {
    return prequest.get<TallyBook.Response<TallyBook.Login.Res>>(ApiName.Login)
  }

  createUser(data: any) {
    return prequest.post(ApiName.CreateUser, { data })
  }

  createBill(data: TallyBook.CreateBill.Args) {
    return prequest.post<TallyBook.Response<TallyBook.CreateBill.Res>>(ApiName.CreateBill, {
      data,
    })
  }
}

export const apiService = new ApiService()

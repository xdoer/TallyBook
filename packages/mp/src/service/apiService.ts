import { prequest } from '@/common/request'
import { WxUser } from '@/types'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

class ApiService {
  login() {
    return prequest.post<TallyBook.Response<TallyBook.Login.Res>>(ApiName.Login)
  }

  register(data: WxUser) {
    return prequest.post<TallyBook.Response<TallyBook.Register.Res>>(ApiName.Register, { data })
  }

  createBill(data: TallyBook.CreateBill.Args) {
    return prequest.post<TallyBook.Response<TallyBook.CreateBill.Res>>(ApiName.CreateBill, {
      data,
    })
  }

  removeBill(data: TallyBook.RemoveBill.Args) {
    return prequest.post<TallyBook.Response<TallyBook.RemoveBill.Res>>(ApiName.RemoveBill, { data })
  }

  createAsset(data: TallyBook.CreateAsset.Args) {
    return prequest.post<TallyBook.CreateAsset.Res>(ApiName.CreateAsset, { data })
  }

  removeAsset(data: TallyBook.RemoveAsset.Args) {
    return prequest.post<TallyBook.Response<TallyBook.RemoveAsset.Res>>(ApiName.RemoveAsset, {
      data,
    })
  }
}

export const apiService = new ApiService()

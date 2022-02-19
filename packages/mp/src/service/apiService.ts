import { prequest, Request } from '@/common/request'
import { WxUser } from '@/types'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

const post = <T>(name: ApiName, options?: Request) =>
  prequest.post<TallyBook.Response<T>>(name, options)

class ApiService {
  login() {
    return post<TallyBook.Login.Res>(ApiName.Login, { skipTokenCheck: true })
  }

  register(data: WxUser) {
    return post<TallyBook.Register.Res>(ApiName.Register, { data, skipTokenCheck: true })
  }

  createBill(data: TallyBook.CreateBill.Args) {
    return post<TallyBook.CreateBill.Res>(ApiName.CreateBill, { data })
  }

  removeBill(data: TallyBook.RemoveBill.Args) {
    return post<TallyBook.RemoveBill.Res>(ApiName.RemoveBill, { data })
  }

  createAsset(data: TallyBook.CreateAsset.Args) {
    return post<TallyBook.CreateAsset.Res>(ApiName.CreateAsset, { data })
  }

  removeAsset(data: TallyBook.RemoveAsset.Args) {
    return post<TallyBook.RemoveAsset.Res>(ApiName.RemoveAsset, { data })
  }
}

export const apiService = new ApiService()

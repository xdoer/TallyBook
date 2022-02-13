import { prequest } from '@/common/request'
import { WxUser } from '@/types'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

class ApiService {
  private post = <T>(name: ApiName, options?: any) =>
    prequest.post<TallyBook.Response<T>>(name, options)
  private get = <T>(name: ApiName, options: any) =>
    prequest.get<TallyBook.Response<T>>(name, options)

  login() {
    return this.post<TallyBook.Login.Res>(ApiName.Login)
  }

  register(data: WxUser) {
    return this.post<TallyBook.Register.Res>(ApiName.Register, { data })
  }

  createBill(data: TallyBook.CreateBill.Args) {
    return this.post<TallyBook.CreateBill.Res>(ApiName.CreateBill, { data })
  }

  removeBill(data: TallyBook.RemoveBill.Args) {
    return this.post<TallyBook.RemoveBill.Res>(ApiName.RemoveBill, { data })
  }

  createAsset(data: TallyBook.CreateAsset.Args) {
    return this.post<TallyBook.CreateAsset.Res>(ApiName.CreateAsset, { data })
  }

  removeAsset(data: TallyBook.RemoveAsset.Args) {
    return this.post<TallyBook.RemoveAsset.Res>(ApiName.RemoveAsset, { data })
  }
}

export const apiService = new ApiService()

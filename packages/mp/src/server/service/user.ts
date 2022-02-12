import { ErrorCode, MPError } from '@/common/Error'
import { WxUser } from '@/types'
import { TallyBook } from '@tally-book/types'
import { dataBaseService } from '../db'

class UserService {
  // 用户登录
  async login(): Promise<TallyBook.Login.Res> {
    const userDB = await dataBaseService.user()
    const accountDB = await dataBaseService.account()
    const assetDB = await dataBaseService.asset()

    const users = await userDB.get()
    const accounts = await accountDB.get()
    const assets = await assetDB.get()

    if (!users.length) throw new MPError('login fail: no user', ErrorCode.Login)

    return {
      user: users[0],
      account: accounts.find((account) => account.isDefault)!,
      asset: assets.find((asset) => asset.isDefault)!,
    }
  }

  // 新增用户
  async register(user: WxUser) {
    const users = await dataBaseService.user()
    const { avatarUrl, nickName } = user
    users.add({ name: nickName, avatar: avatarUrl })
  }
}

export const userService = new UserService()

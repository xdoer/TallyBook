import { ErrorCode, MPError } from '@/common/Error'
import { WxUser } from '@/types'
import { defaultAccount, defaultAsset } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { assetService } from '.'
import { dataBaseService } from '../db'
import { accountService } from './account'

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
    const newUser = await users.add({ name: nickName, avatar: avatarUrl })

    await assetService.createAsset(defaultAsset, { user: newUser })
    await accountService.createAccount(defaultAccount, { user: newUser })
  }
}

export const userService = new UserService()

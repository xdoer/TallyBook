import { MPError } from '@/common/Error'
import { User } from '@tally-book/model'
import { dataBaseService } from '../db'

class UserService {
  async login() {
    const userDB = await dataBaseService.user()
    const accountDB = await dataBaseService.account()
    const assetDB = await dataBaseService.asset()

    const users = await userDB.get()
    const accounts = await accountDB.get()
    const assets = await assetDB.get()

    if (!users.length) throw new MPError('no user')

    return {
      user: users[0],
      account: accounts.find((account) => account.isDefault),
      asset: assets.find((asset) => asset.isDefault),
    }
  }

  // 首页接口
  async getUsers(): Promise<User[]> {
    const users = await dataBaseService.user()
    return users.get() as any
  }

  // 新增用户
  async addUser(user) {
    const users = await dataBaseService.user()
    users.add(user)
  }
}

export const userService = new UserService()

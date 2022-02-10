import { User } from '@tally-book/model'
import { dataBaseService } from '../db'

class UserService {
  async login() {
    const userDB = await dataBaseService.user()
    const accountDB = await dataBaseService.account()

    const users = await userDB.get()
    const accounts = await accountDB.get()

    return {
      user: users[0],
      account: accounts.find((account) => account.default),
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

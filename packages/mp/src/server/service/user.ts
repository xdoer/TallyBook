import { User } from '@tally-book/model'
import { dataBaseService } from '../db'

class UserService {
  async login() {
    const users = await dataBaseService.user
    const u = await users.get()
    return u[0]
  }

  // 首页接口
  async getUsers(): Promise<User[]> {
    const users = await dataBaseService.user
    return users.get() as any
  }

  // 新增用户
  async addUser(user) {
    const users = await dataBaseService.user
    users.add(user)
  }
}

export const userService = new UserService()

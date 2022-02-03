import { User } from '@/model'
import { dataBaseService } from '../db'

class UserService {
  userDB = dataBaseService.user

  async login() {
    const users = await this.userDB
    const u = await users.get()
    return u[0]
  }

  // 首页接口
  async getUsers(): Promise<User[]> {
    const users = await this.userDB
    return users.get() as any
  }

  // 新增用户
  async addUser(user) {
    const users = await this.userDB
    users.add(user)
  }
}

export const userService = new UserService()

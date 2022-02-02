import { User } from '@/model'
import { dataBaseService } from '../db'

class UserService {
  // 首页接口
  async getUsers(): Promise<User[]> {
    const users = await dataBaseService.user()
    return users.get() as any
  }
}

export const userService = new UserService()

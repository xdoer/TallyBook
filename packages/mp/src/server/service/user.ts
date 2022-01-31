import { User } from '@/model'
import { dataBaseService } from '../db'

class UserService {
  // 首页接口
  async getUsers(): Promise<User[]> {
    return dataBaseService.user.get() as any
  }
}

export const userService = new UserService()

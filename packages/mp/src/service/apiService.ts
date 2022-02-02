import { prequest } from '@/common/request/query'

class ApiService {
  createUser(data: any) {
    prequest.post('/createUser', { data })
  }
}

export const apiService = new ApiService()

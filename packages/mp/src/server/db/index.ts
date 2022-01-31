import { PLATFORM } from '@/common/constants'
import { Currency, Bill, BillType, User } from '@/model'
import { Account } from '@/model/Account'
import { Asset } from '@/model/Asset'
import StorageDBService from './connect/storage'
import WxCloudDBService from './connect/wxCloud'

const BaseDBService = PLATFORM.isWxCloud ? WxCloudDBService : StorageDBService

BaseDBService.init()

class DataBaseService {
  // 账单
  bill = new BaseDBService<Bill>('bill')

  // 账单类型
  billType = new BaseDBService<BillType>('billType')

  // 用户
  user = new BaseDBService<User>('user')

  // 汇率
  currency = new BaseDBService<Currency>('currency')

  // 账户
  account = new BaseDBService<Account>('account')

  // 资产
  asset = new BaseDBService<Asset>('asset')
}

export const dataBaseService = new DataBaseService()

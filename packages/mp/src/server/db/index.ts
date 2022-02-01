import { PLATFORM } from '@/common/constants'
import { Currency, Bill, BillType, User } from '@/model'
import { Account } from '@/model/Account'
import { Asset } from '@/model/Asset'
import { Common } from '@/types/util'
import StorageDBService from './connect/storage'
import WxCloudDBService from './connect/wxCloud'
import { accounts, assets, billTypes } from './data'

const BaseDBService = PLATFORM.isWxCloud ? WxCloudDBService : StorageDBService
// const BaseDBService = StorageDBService
// const BaseDBService = WxCloudDBService

BaseDBService.init()

class DataBaseService {
  // 数据库的表映射
  table = new BaseDBService<any>('table')
  bill = new BaseDBService<Bill>('bill')
  billType = new BaseDBService<BillType>('billType')
  user = new BaseDBService<User>('user')
  currency = new BaseDBService<Currency>('currency')
  account = new BaseDBService<Account>('account')
  asset = new BaseDBService<Asset>('asset')

  async initData() {
    const table = await this.table.get()
    const data = [
      {
        name: 'account',
        data: accounts,
      },
      {
        name: 'billType',
        data: billTypes,
      },
      {
        name: 'asset',
        data: assets,
      },
    ]

    for await (const iterator of data) {
      const { name } = iterator
      const has = table.find((tb) => tb.name === name)

      if (!!has) continue

      for await (const it of iterator.data) {
        await this[name].add(it)
      }

      await this.table.add({ name })
    }
  }

  constructor() {
    this.initData()
  }
}

export const dataBaseService = new DataBaseService()

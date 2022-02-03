import { Currency, Bill, BillType, User, Account, Asset } from '@/model'
import { WxCloudDBConnect, StorageDBConnect, BaseDBConnect } from './connect'
import { init } from './init'
import { PLATFORM } from '@/store/app'

class DataBaseService {
  initData = false

  user = this.connect<User>('user')
  account = this.connect<Account>('account')
  currency = this.connect<Currency>('currency')
  bill = this.connect<Bill>('bill')
  billType = this.connect<BillType>('billType')
  asset = this.connect<Asset>('asset')

  async init(table: BaseDBConnect) {
    const tables = await table.get()

    for await (const meta of init) {
      const { name } = meta

      // @ts-ignore
      const has = tables.find((tb) => tb.name === name)

      if (!!has) continue

      for await (const it of meta.data) {
        const t = await this[name]
        await t.add(it)
      }
      await table.add({ name })
    }
  }

  async connect<T>(key: string) {
    const { isLocal } = await PLATFORM.getState()
    const Connect = isLocal ? StorageDBConnect : WxCloudDBConnect

    Connect.init()

    if (!this.initData) {
      await this.init(new Connect<{ name: string }>('table'))
      this.initData = true
    }

    return new Connect<T>(key)
  }
}

export const dataBaseService = new DataBaseService()

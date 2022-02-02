import { Currency, Bill, BillType, User, Account, Asset } from '@/model'
import { WxCloudDBConnect, StorageDBConnect } from './connect'
import { init } from './init'
import { PLATFORM } from '@/store/app'

class DataBaseService {
  table = () => this.connect<{ name: string }>('table')
  user = () => this.connect<User>('user')
  account = () => this.connect<Account>('account')
  currency = () => this.connect<Currency>('currency')
  bill = () => this.connect<Bill>('bill')
  billType = () => this.connect<BillType>('billType')
  asset = () => this.connect<Asset>('asset')

  async init() {
    const table = await this.table()
    const tables = await table.get()

    for await (const meta of init) {
      const { name } = meta

      // @ts-ignore
      const has = tables.find((tb) => tb.name === name)

      if (!!has) continue

      for await (const it of meta.data) {
        const t = await this[name]()
        await t.add(it)
      }

      await table.add({ name })
    }
  }

  connect<T>(key: string) {
    return PLATFORM.getState()
      .then(({ isLocal }) => {
        const Connect = isLocal ? StorageDBConnect : WxCloudDBConnect
        Connect.init()
        return Connect
      })
      .then((Connect) => new Connect<T>(key))
  }

  constructor() {
    this.init()
  }
}

export const dataBaseService = new DataBaseService()

import {
  Currency,
  Bill,
  BillType,
  User,
  Account,
  Asset,
  dataInit,
  tableName,
} from '@tally-book/model'
import { WxCloudDBConnect, StorageDBConnect, BaseDBConnect } from './connect'
import { PLATFORM } from '@/store/app'
import { Connect as ConnectType } from './connect/BaseDBConnect'

class DataBaseService {
  private table: BaseDBConnect<{ name: string }>
  private dbTableList: { name: string }[] = []

  user = () => this.init<User>(tableName.user)
  account = () => this.init<Account>(tableName.account)
  currency = () => this.init<Currency>(tableName.currency)
  bill = () => this.init<Bill>(tableName.bill)
  billType = () => this.init<BillType>(tableName.billType)
  asset = () => this.init<Asset>(tableName.asset)

  private async init<T>(name: tableName) {
    return this.connect().then((Connect) => this.initTable<T>(Connect as any, name))
  }

  // 初始化表数据
  private async initTable<T>(Connect: typeof ConnectType, name: string) {
    const table = await Connect.get<T>(name)

    if (table.isInit) return table.promise
    table.isInit = true

    const connect = new Connect<T>(name)

    const has = this.dbTableList.find((tb) => tb.name === name)

    if (!!has) {
      table.resolve(connect)
      return connect
    }

    const getInitData = dataInit.find((i) => i.name === name)

    if (getInitData) {
      const { data } = getInitData

      for await (const meta of data) {
        // @ts-ignore
        await connect.add(meta)
      }
    }

    this.dbTableList.push({ name })
    await this.table.add({ name })

    table.resolve(connect)
    return connect
  }

  // 初始化数据库链接
  private async connect(): Promise<typeof Connect> {
    const { isLocal } = await PLATFORM.getState()
    const Connect = isLocal ? StorageDBConnect : WxCloudDBConnect

    // 初始化数据库链接
    if (Connect.isInit) return Connect.promise as any
    Connect.isInit = true

    await Connect.init()

    // 初始化数据库的 table 数据表
    this.table = new Connect<{ name: string }>('table')
    this.dbTableList = await this.table.get()

    Connect.resolve(Connect)

    return Connect
  }
}

export const dataBaseService = new DataBaseService()

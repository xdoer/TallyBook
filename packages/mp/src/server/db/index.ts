import { Currency, Bill, BillType, User, Account, Asset, dataInit, tableName } from '@tally-book/model'
import { WxCloudDBConnect, StorageDBConnect, BaseDBConnect } from './connect'
import { PLATFORM } from '@/store/app'
import { DBConnect } from './connect/BaseDBConnect'

type Connect = typeof WxCloudDBConnect | typeof StorageDBConnect | typeof DBConnect

class DataBaseService {
  table: BaseDBConnect
  dbTableList: { name: string }[] = []

  user = this.connect().then((Connect) => this.init<User>(Connect, tableName.user))
  account = this.connect().then((Connect) => this.init<Account>(Connect, tableName.account))
  currency = this.connect().then((Connect) => this.init<Currency>(Connect, tableName.currency))
  bill = this.connect().then((Connect) => this.init<Bill>(Connect, tableName.bill))
  billType = this.connect().then((Connect) => this.init<BillType>(Connect, tableName.billType))
  asset = this.connect().then((Connect) => this.init<Asset>(Connect, tableName.asset))

  // 初始化表数据
  async init<T>(Connect: Connect, name: string) {
    const db = await Connect.get(name)

    if (db.isInit) return db.promise
    db.isInit = true

    const connect = new Connect<T>(name)

    const has = this.dbTableList.find((tb) => tb.name === name)

    if (!!has) {
      db.resolve(connect)
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
    if (this.dbTableList.length === dataInit.length) {
      // 顺序插入数据，并发在 Storage 模式下会丢数据
      for await (const i of this.dbTableList) {
        await this.table.add(i)
      }
    }

    db.resolve(connect)
    return connect
  }

  async connect() {
    const { isLocal } = await PLATFORM.getState()
    const Connect = isLocal ? StorageDBConnect : WxCloudDBConnect

    // 初始化数据库链接
    if (Connect.isInit) return Connect.promise
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

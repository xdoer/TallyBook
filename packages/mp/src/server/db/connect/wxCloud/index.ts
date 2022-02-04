import Taro from '@tarojs/taro'
import { AtLeastOne } from '@/types/util'
import { BaseDBConnect, DBConnect } from '../BaseDBConnect'
import { clone, uuid } from '@/common/utils'

export default class DBService<T> extends DBConnect implements BaseDBConnect {
  private db = Taro.cloud.database()
  private collection: Taro.DB.Collection
  command = this.db.command

  constructor(private name: string) {
    super()
    this.collection = this.db.collection(this.name)
  }

  static async init() {
    return Taro.cloud.init()
  }

  private uuid() {
    return `${this.name}-${uuid()}`
  }

  async add(data: Omit<T, 'id'>) {
    return this.collection.add({ data: { ...data, createdAt: Date.now(), id: this.uuid() } })
  }

  get(condition?: string | AtLeastOne<T>) {
    if (!condition) return this.collection.get().then(({ data }) => data)
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    return this.collection
      .where(query)
      .get()
      .then(({ data }) => data)
  }

  remove(condition: string | AtLeastOne<T>) {
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    // @ts-ignore
    return this.collection.where(query).remove()
  }

  update(condition: string | AtLeastOne<T>, data: Partial<T>) {
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    // @ts-ignore
    return this.collection.where(query).update({ data })
  }
}

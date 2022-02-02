import Taro from '@tarojs/taro'
import { AtLeastOne } from '@/types/util'
import { BaseDBConnect } from '../BaseDBConnect'

export default class DBService<T> implements BaseDBConnect {
  private db = Taro.cloud.database()
  private collection: Taro.DB.Collection
  command = this.db.command

  // name 为表名称
  constructor(private name: string) {
    this.collection = this.db.collection(this.name)
  }

  static init() {
    Taro.cloud.init()
  }

  async add(data: Omit<T, 'id'>) {
    return this.collection.add({ data: { ...data, createdAt: Date.now() } })
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

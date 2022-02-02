import { setStorage, getStorage } from '@tarojs/taro'
import { AtLeastOne } from '@/types/util'
import { uuid } from '@/common/utils'
import { BaseDBConnect } from '../BaseDBConnect'

export default class DBService<T> implements BaseDBConnect {
  // name 为表名称
  constructor(private name: string) {}

  static init() {}

  private async getTable(): Promise<T[]> {
    try {
      const res = await getStorage<T[]>({ key: this.name })
      return res.data || []
    } catch (e) {
      await this.setTable([])
    }
    return []
  }

  private setTable(data: T[]) {
    return setStorage({ key: this.name, data })
  }

  private uuid() {
    return `${this.name}-${uuid()}`
  }

  async add(data: Omit<T, 'id'>) {
    const table = await this.getTable()
    table.push({ ...data, createdAt: Date.now(), id: this.uuid() } as any)
    this.setTable(table)
  }

  get(condition?: string | AtLeastOne<T>) {
    if (!condition) return this.getTable()
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    return this.getTable().then((table) => {
      return table.filter((row) => {
        return Object.keys(query).every((key) => query[key] === row[key])
      })
    })
  }

  async remove(condition: string | AtLeastOne<T>) {
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    const table = await this.getTable()
    const targetIdx = table.findIndex((row) => {
      return Object.keys(query).every((key) => query[key] === row[key])
    })

    if (targetIdx !== -1) {
      table.splice(targetIdx, 1)
    }

    return this.setTable(table)
  }

  async update(condition: string | AtLeastOne<T>, data: Partial<T>) {
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    const table = await this.getTable()
    const targetIdx = table.findIndex((row) => {
      return Object.keys(query).every((key) => query[key] === row[key])
    })

    if (targetIdx !== -1) {
      table[targetIdx] = { ...table[targetIdx], ...data }
    }

    return this.setTable(table)
  }
}

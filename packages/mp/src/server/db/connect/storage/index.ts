import { setStorage } from '@tarojs/taro'
import { AtLeastOne } from '@/types/util'
import { getStorage } from '@/common/utils'
import { DBConnect, BaseDBConnect } from '../BaseDBConnect'

export default class DBService<T> extends DBConnect implements BaseDBConnect<T> {
  name: string

  constructor(name: string) {
    super(name)
    this.name = `db-${name}`
  }

  private async getTable(): Promise<T[]> {
    const table = await getStorage<T[]>(this.name)

    if (table) return table

    await this.setTable([])

    return []
  }

  private setTable(data: T[]) {
    return setStorage({ key: this.name, data })
  }

  add = async (data: Omit<T, 'id'>) => {
    const table = await this.getTable()
    table.push({ ...data, createdAt: Date.now(), id: this.uuid() } as any)
    this.setTable(table)
  }

  get = (condition?: string | AtLeastOne<T>) => {
    if (!condition) return this.getTable()
    const query: any = typeof condition === 'string' ? { id: condition } : condition
    return this.getTable().then((table) => {
      return table.filter((row) => {
        return Object.keys(query).every((key) => query[key] === row[key])
      })
    })
  }

  remove = async (condition: string | AtLeastOne<T>) => {
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

  update = async (condition: string | AtLeastOne<T>, data: Partial<T>) => {
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

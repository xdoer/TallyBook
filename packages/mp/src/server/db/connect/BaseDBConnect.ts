import { uuid } from '@/common/utils'
import { AtLeastOne } from '@/types'

// 抽象类-每个 Connect 需要实现的方法
export abstract class BaseDBConnect<T> {
  abstract add(d: Omit<T, 'id'>): any
  abstract get(condition?: string | AtLeastOne<T>): any
  abstract remove(condition?: string | AtLeastOne<T>): any
  abstract update(condition: string | AtLeastOne<T>, data: Partial<Omit<T, 'id'>>): any
}

// 公共 Connect 方法
export class DBConnect {
  constructor(protected name: string) {}

  protected uuid() {
    return `${this.name}-${uuid()}`
  }

  static resolve
  static promise: Promise<typeof Connect> = new Promise((resolve) => (DBConnect.resolve = resolve))
  static isInit = false
  static async init() {}

  static tableMap = {}
  static get<T>(name: string): TablePromise<T> {
    const meta = DBConnect.tableMap[name]
    if (meta) return meta

    let resolve
    let promise: Promise<Connect<T>> = new Promise((r) => (resolve = r))

    return (DBConnect.tableMap[name] = { isInit: false, resolve, promise })
  }
}

interface TablePromise<T> {
  isInit: boolean
  promise: Promise<Connect<T>>
  resolve: (d: Connect<T>) => void
}

export declare class Connect<T> extends DBConnect implements BaseDBConnect<T> {
  add(d: Omit<T, 'id'>): Promise<T>
  get(condition?: string | AtLeastOne<T>): Promise<T[]>
  remove(condition?: string | AtLeastOne<T>): any
  update(condition: string | AtLeastOne<T>, data: Partial<Omit<T, 'id'>>): any
}

import { uuid } from "@/common/utils"

export abstract class BaseDBConnect {
  abstract add(d: any): any
  abstract get(d?: any): any
  abstract remove(d?: any): any
  abstract update(d?: any, t?: any): any
}

export class DBConnect {

  constructor(protected name: string) { }

  protected uuid() {
    return `${this.name}-${uuid()}`
  }

  static resolve
  static promise: Promise<typeof DBConnect> = new Promise(
    (resolve) => (DBConnect.resolve = resolve),
  )
  static isInit = false
  static async init() { }

  static get = (() => {
    const map = {}

    return async (name: string) => {
      const meta = map[name]
      if (meta) return meta

      let resolve
      let promise = new Promise((r) => (resolve = r))

      return (map[name] = { isInit: false, resolve, promise })
    }
  })()
}

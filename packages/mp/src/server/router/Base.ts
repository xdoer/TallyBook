import { ErrorCode, MPError } from '@/common/Error'
import { ApiName } from '@tally-book/model'
import { Common } from '@tally-book/types'

interface Route {
  [key: string]: (data: Common, token: Common, options: Common) => Promise<any>
}

export class Router {
  private routers: Route = {}

  use(path: ApiName, cb) {
    this.routers[path] = cb
    return this
  }

  async call(options, token) {
    const { path, method, data = {}, params = {} } = options

    try {
      const cb = this.routers[path]
      if (!cb) throw new MPError('no route', ErrorCode.NotFound)

      return {
        success: true,
        result: await cb(method === 'POST' ? data : params, token, options),
        error: null,
      }
    } catch (e) {
      return {
        success: false,
        result: null,
        error: MPError.enhance(e),
      }
    }
  }

  routes() {
    return this.routers
  }

  merge(routers) {
    this.routers = { ...this.routers, ...routers }
    return this
  }
}

export const localRouter = new Router()

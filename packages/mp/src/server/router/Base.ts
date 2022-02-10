import { MPError } from '@/common/Error'
import { Common } from '@/types'

interface Route {
  [key: string]: (data: Common, options: Common) => Promise<any>
}

export class Router {
  private routers: Route = {}

  use(path, cb) {
    this.routers[path] = cb
    return this
  }

  async call(options) {
    const { path, method, data = {}, params = {} } = options

    try {
      return {
        success: true,
        result: await this.routers[path](method === 'POST' ? data : params, options),
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

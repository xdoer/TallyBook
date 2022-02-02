interface Route {
  [key: string]: (options: any) => Promise<any>
}

export class Router {
  private routers: Route = {}

  use(path, cb) {
    this.routers[path] = cb
    return this
  }

  async call(options) {
    const { path, ...opts } = options

    try {
      return {
        success: true,
        data: await this.routers[path](opts),
        error: null,
      }
    } catch (e) {
      return {
        success: false,
        data: null,
        error: {
          code: e.code,
          message: e.message,
        },
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

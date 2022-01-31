interface Route {
  [key: string]: (options: any) => Promise<any>
}

export class Router {
  private routers: Route = {}

  use(path, cb) {
    this.routers[path] = cb
    return this
  }

  call(options) {
    const { path, ...opts } = options
    return this.routers[path](opts)
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

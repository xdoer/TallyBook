import { navigateTo } from "@/common/router"

class RouterService {
  Index = "/pages/index/index";

  toIndex<T>(data?: T, opt?: any) {
    navigateTo("/pages/index/index", data as any, opt as any)
  }
}

export const routerService = new RouterService()

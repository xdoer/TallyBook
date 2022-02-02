import { setStorage } from '@tarojs/taro'
import { StateBus } from '@xdoer/state-bus'
import { isUndefined, getStorage } from './utils'

export class StorageState<T = any> extends StateBus<T> {
  constructor(private key: string, init?: T | (() => T)) {
    super(init)
  }

  // @ts-ignore
  async getState(): Promise<T> {
    const state = super.getState()
    const storage: any = await getStorage(this.key)

    if (!isUndefined(storage)) {
      if (state !== storage) {
        super.setState(storage as any)
      }
      return storage
    }

    if (!isUndefined(state)) {
      await setStorage({ key: this.key, data: state })
    }

    return state
  }

  async setState(state: any) {
    super.setState(state)
    await setStorage({ key: this.key, data: state })
  }
}

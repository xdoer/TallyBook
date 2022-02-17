import StateBus from '@xdoer/state-bus'
import React from 'react'

type IState<T> = T & { key: string }

export class LayerService<T extends { visible: boolean }> {
  state: StateBus<IState<T>[]>

  constructor(private init: T) {
    this.state = new StateBus<IState<T>[]>([])
  }

  open(key: string, data?: Omit<T, 'visible'> | React.ReactElement) {
    this.state.setState((prev) => {
      const find = prev.find((i) => i.key === key)
      if (find) {
        find.visible = true
        return [...prev]
      }
      return prev.concat({
        ...this.init,
        key,
        visible: true,
        ...(React.isValidElement(data) ? { content: data } : data),
      })
    })
  }

  close(key: string) {
    this.state.setState((prev) => {
      const find = prev.find((i) => i.key === key)
      find!.visible = false
      return [...prev]
    })
  }
}

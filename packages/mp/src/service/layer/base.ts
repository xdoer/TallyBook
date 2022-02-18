import StateBus from '@xdoer/state-bus'
import React from 'react'

interface Layer<T> {
  visible: boolean
  model: T
  key: string
}

export class LayerService<T> {
  state: StateBus<Layer<T>[]>

  constructor(private init: T) {
    this.state = new StateBus<Layer<T>[]>([])
  }

  open(data: T | React.ReactElement, key = 'default') {
    const _data = React.isValidElement(data) ? { content: data } : data

    this.state.setState((prev) => {
      const findIdx = prev.findIndex((i) => i.key === key)
      const newObj: Layer<T> = { model: { ...this.init, ..._data }, visible: true, key }

      prev[findIdx === -1 ? prev.length : findIdx] = newObj

      return [...prev]
    })
  }

  close(key = 'default') {
    this.state.setState((prev) =>
      prev.map((i) => ({ ...i, visible: key === i.key ? false : i.visible })),
    )
  }
}

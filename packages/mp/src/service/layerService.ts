import StateBus from '@xdoer/state-bus'
import React, { CSSProperties } from 'react'

export interface Layer<T> {
  visible: boolean
  model: T
  key: string
}

class LayerService<T> {
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

  private i = 0

  getUnit() {
    const key = 'unit_' + this.i++
    return {
      open: (data: T | React.ReactElement) => this.open.bind(this)(data, key),
      close: () => this.close.bind(this)(key),
    }
  }
}

export interface LayerType {
  title?: string
  content?: JSX.Element | string
  okText?: string
  type?: 'default' | 'modal'
  cancelText?: string
  onOk?(): void
  onCancel?(): void
  style?: CSSProperties
}

export const layerService = new LayerService<LayerType>({
  title: '提示',
  okText: '确认',
  type: 'default',
})

import StateBus from '@xdoer/state-bus'
import React, { CSSProperties } from 'react'
import { produce } from 'immer'

export interface Layer<T> {
  visible: boolean
  model: T
  key: string
  zIndex: number
}

class LayerService<T> {
  state: StateBus<Layer<T>[]> = new StateBus<Layer<T>[]>([])
  zIndex = 10
  watches = {}

  constructor(private init: T) {}

  open(data: T | React.ReactElement, key = 'default') {
    const _data = React.isValidElement(data) ? { content: data } : data

    this.state.setState(
      produce((prev) => {
        const idx = prev.findIndex((i) => i.key === key)
        const newObj: Layer<T> = {
          model: { ...this.init, ..._data },
          visible: true,
          key,
          zIndex: this.zIndex++,
        }

        if (this.watches[key]) {
          this.watches[key](newObj)
        }

        prev[idx === -1 ? prev.length : idx] = newObj as any
      }),
    )
  }

  close(key = 'default') {
    this.state.setState(
      produce((prev) => {
        const idx = prev.findIndex((i) => i.key === key)
        prev[idx].visible = false

        if (this.watches[key]) {
          this.watches[key](prev[idx])
        }
      }),
    )
  }

  watch(key: string, cb: (v: Layer<T>) => void) {
    this.watches[key] = cb
  }

  unWatch(key: string) {
    delete this.watches[key]
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
  closeable?: boolean
}

export const layerService = new LayerService<LayerType>({
  title: '提示',
  okText: '确认',
  type: 'default',
})

import StateBus from '@xdoer/state-bus'

export class LayerService<T extends { visible: boolean }> {
  state: StateBus<T>

  visible = false
  queue: T[] = []

  constructor(init: T) {
    this.state = new StateBus<T>(init)
  }

  open(data?: Omit<T, 'visible'>) {
    const d: any = { ...data, visible: true }

    if (this.visible) {
      this.queue.push(d)
      return
    }

    this.visible = true
    this.state.setState(d)
  }

  close() {
    this.state.setState((prev) => {
      prev.visible = false
      return { ...prev }
    })

    this.visible = false

    if (this.queue.length) {
      this.open(this.queue.shift())
    }
  }

  useLayer() {
    const [state] = this.state.useState()
    return {
      state,
      close: this.close.bind(this),
      open: this.open.bind(this),
    }
  }
}

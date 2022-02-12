import StateBus from '@xdoer/state-bus'

export class LayerService<T extends { visible: boolean }> {
  private state: StateBus<T>

  private visible = false
  private queue: T[] = []

  constructor(init: T) {
    this.state = new StateBus<T>(init)
  }

  open(data?: Omit<T, 'visible'>) {
    if (this.visible) return this.queue.push(data as any)

    this.visible = true
    this.state.setState((prev) => ({ ...prev, ...data, visible: true }))
  }

  close() {
    if (!this.visible) return

    this.state.setState((prev) => ({ ...prev, visible: false }))

    if (!this.queue.length) return (this.visible = false)

    setTimeout(() => {
      this.visible = false
      this.open(this.queue.shift())
    }, 500)
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

import StateBus from '@xdoer/state-bus'

export class LayerService<T extends { visible: boolean }> {
  state: StateBus<T>

  constructor(init: T) {
    this.state = new StateBus<T>(init)
  }

  open(data?: Omit<T, 'visible'>) {
    this.state.setState({ ...data, visible: true } as any)
  }

  close() {
    this.state.setState((prev) => {
      prev.visible = false
      return { ...prev }
    })
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

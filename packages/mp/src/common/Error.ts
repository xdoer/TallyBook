export class MPError {
  code: string
  message: string

  constructor(message?: string, code?: string) {
    this.code = code || 'Unknown Error'
    this.message = message || 'unknown error'
  }

  static enhance(error: Error) {
    if (error instanceof MPError) return error

    return new MPError(error.message)
  }
}

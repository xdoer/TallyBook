export function success(data: any) {
  return {
    success: true,
    data: data,
    error: null,
  }
}

export function fail(code, message) {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  }
}

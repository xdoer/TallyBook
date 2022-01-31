export function safeJsonParse(data: any) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

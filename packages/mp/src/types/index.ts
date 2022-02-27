export interface WxUser {
  avatarUrl: string
  nickName: string
}

declare module '@prequest/types' {
  interface PQRequest {
    skipTokenCheck?: boolean
  }

  interface PQResponse<T> {
    success: boolean
    result: T
    error: {
      code: string
      message: string
    }
  }
}

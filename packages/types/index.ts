import { Bill, BillType } from '@tally-book/model'

export type Common = Record<string, any>

export namespace TallyBook {
  export interface Response<T = any> {
    success: boolean
    result: T
    error: {
      code: string
      message: string
    }
  }

  export interface User {
    id: string
  }

  export interface Account {
    id: string
  }

  export namespace Login {
    export type Args = Common
    export interface Res {
      user: User
      account: Account
    }
  }

  export interface billTypes {
    type: 'income' | 'outcome'
    value: '收入' | '支出'
    grid: BillType[]
  }

  export interface createBillOptions {
    typeId: string
    money: number
    remark?: string
    currencyId?: string
    accountId?: string
    assetId?: string
    userId?: string
  }

  export interface bills {
    date: string
    list: Bill[]
  }
}

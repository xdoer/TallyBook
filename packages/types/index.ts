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

  export interface Asset {
    id: string
  }

  export namespace Login {
    export type Args = Common
    export interface Res {
      user: User
      account: Account
      asset: Asset
    }
  }

  export namespace GetBills {
    export interface Args {
      pageNo: number
      pageSize: number
    }

    export interface Res {
      hasNext: boolean
      total: number
      list: Bill[]
    }
  }

  export namespace GetBillTypes {
    export interface Args {}

    export interface Res {
      type: 'income' | 'outcome'
      value: '收入' | '支出'
      grid: BillType[]
    }
  }

  export namespace CreateBillOptions {
    export interface Args {
      typeId: string
      money: number
      remark?: string
      accountId?: string
      assetId?: string
      userId?: string
    }

    export type Res = Bill
  }
}

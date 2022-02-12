import { Account, Asset, Bill, BillType, Currency, User } from '@tally-book/model'
import { Common } from './utils'

export namespace TallyBook {
  export interface Response<T = any> {
    success: boolean
    result: T
    error: {
      code: string
      message: string
    }
  }

  export namespace Register {
    export type Args = Common
    export type Res = boolean
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
    export interface BillRes extends Bill {
      type: BillType
    }

    export interface Args {
      pageNo: number
      pageSize: number
    }

    export interface Res {
      hasNext: boolean
      total: number
      list: BillRes[]
    }
  }

  export namespace GetBill {
    export interface Args {
      id: string
    }

    export interface Res extends Bill {
      type: BillType
      account: Account
      asset: Asset
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

  export namespace CreateBill {
    export interface BillRes extends Bill {
      type: BillType
    }

    export interface Args {
      typeId: string
      money: number
      remark?: string
      accountId?: string
      assetId?: string
      userId?: string
    }

    export type Res = BillRes
  }

  export namespace GetAssets {
    export interface Args {}

    export type Res = Asset[]
  }
}

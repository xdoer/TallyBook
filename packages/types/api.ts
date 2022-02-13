import { Account, Asset, Bill, BillType, User } from '@tally-book/model'
import { Common } from './utils'
import { Time } from './common'
import { AtLeastOne } from '.'

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
      time: AtLeastOne<Time>
    }

    export type Res = BillRes[]
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

  export namespace RemoveBill {
    export interface Args {
      id: string
    }

    export type Res = boolean
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
      time: string
      remark?: string
      accountId?: string
      assetId?: string
    }

    export type Res = BillRes
  }

  export namespace GetAssets {
    export interface Args {}

    export type Res = Asset[]
  }

  export namespace GetAsset {
    export interface Args {
      id: string
    }

    export type Res = Asset
  }

  export namespace RemoveAsset {
    export interface Args {
      id: string
    }

    export type Res = Boolean
  }

  export namespace CreateAsset {
    export interface Args {
      name: string
      money: number
      budget: number
      isDefault: boolean
      icon: string
    }
    export type Res = boolean
  }

  export namespace Statistics {
    export interface Args {
      dimension: 'week' | 'month' | 'year'
      time: AtLeastOne<Time>
    }

    export interface Res {}
  }

  export namespace CreateAccount {
    export interface Args {
      name: string
      isDefault: boolean
      remark?: string
      icon?: string
    }

    export type Res = boolean
  }
}

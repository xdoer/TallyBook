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

  export interface UserVO {
    id: string
    name: string
  }

  export interface AccountVO {
    id: string
    name: string
    icon: string
  }

  export interface AssetVO {
    id: string
  }

  export interface BillTypeVO {
    id: string
    icon: string
    type: 'income' | 'outcome' | 'none'
    text: string
  }

  export interface CurrencyVO {}

  export interface BillVO {
    id: string
    type: BillTypeVO
    money: number
    createdAt: string
  }

  export namespace Login {
    export type Args = Common
    export interface Res {
      user: UserVO
      account: AccountVO
      asset: AssetVO
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
      list: BillVO[]
    }
  }

  export namespace GetBillTypes {
    export interface Args {}

    export interface Res {
      type: 'income' | 'outcome'
      value: '收入' | '支出'
      grid: BillTypeVO[]
    }
  }

  export namespace CreateBill {
    export interface Args {
      typeId: string
      money: number
      remark?: string
      accountId?: string
      assetId?: string
      userId?: string
    }

    export type Res = BillVO
  }
}

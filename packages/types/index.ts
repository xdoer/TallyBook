import { Bill, BillType } from '@tally-book/model'

export namespace TallyBook {
  export interface Response<T> {
    success: boolean
    result: T
    error: {
      code: string
      message: string
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

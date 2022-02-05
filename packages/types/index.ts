import { BillType } from '@tally-book/model'

export namespace TallyBook {
  export interface billTypes {
    type: 'income' | 'outcome'
    value: '收入' | '支出'
    grid: BillType[]
  }

  export interface createBillOptions {
    id: string
    currencyId: string
    money: number
    remark: string

    accountId: string
    assetId: string
    userId: string
  }
}

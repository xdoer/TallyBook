import { BillType } from '@/model'

export namespace mpRequest {
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

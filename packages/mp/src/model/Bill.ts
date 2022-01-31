// 账单模型
export class Bill {
  // 账单 ID
  id: string

  // 账单类型
  typeId: string

  // 创建人
  userId: string

  // 0 表示不计入；1 是收入；2 是支出
  incomeType: 0 | 1 | 2

  // 金额
  money: number

  // 付款账户
  accountId: string

  // 备注
  remark: string
}

export const billData: Bill[] = [
  {
    id: '1',
    typeId: '1',
    userId: '1',
    incomeType: 2,
    money: 20,
    accountId: '1',
    remark: '新七天吃饭'
  },
  {
    id: '2',
    typeId: '1',
    userId: '1',
    incomeType: 2,
    money: 20,
    accountId: '2',
    remark: '新七天吃饭'
  },
]

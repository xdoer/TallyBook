export class Account {
  id: string // 账户 id

  assetId: string // 资产类型 id

  name: string // 账户名称

  money: number // 账户余额

  currencyId: string // 币种 id

  icon: string // 图标

  remark: string // 备注
}

export const accountData: Account[] = [
  {
    id: '1',
    assetId: '1',
    name: '我的微信账户',
    money: 2000,
    currencyId: '1',
    icon: '',
    remark: '测试账户'
  },
  {
    id: '2',
    assetId: '2',
    name: '我的支付宝账户',
    money: 10086,
    currencyId: '2',
    icon: '',
    remark: '美元支付宝账户'
  }
]

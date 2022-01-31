export class Asset {
  id: string // 资产 id

  name: string // 资产名称

  type: string // 资产类型

  icon: string
}

export const assetData: Asset[] = [
  {
    id: '1',
    name: '微信支付',
    type: '现金',
    icon: ''
  },
  {
    id: '2',
    name: '支付宝',
    type: '现金',
    icon: ''
  }
]

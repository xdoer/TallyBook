// 币种模型
export class Currency {
  id: string

  // 符号
  symbol: '￥' | '$' | ({} & string)

  value: string
}

export const currencyData: Currency[] = [
  {
    id: '1',
    symbol: '￥',
    value: '人民币'
  },
  {
    id: '2',
    symbol: '$',
    value: '美元'
  }
]

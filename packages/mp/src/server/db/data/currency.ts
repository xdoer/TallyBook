import { Currency } from '@/model'

export const currencies: Omit<Currency, 'id'>[] = [
  {
    symbol: '￥',
    code: 'RMB',
    text: '人民币',
  },
]

import { Currency } from '@/model'

export const currency: Omit<Currency, 'id'>[] = [
  {
    symbol: '￥',
    code: 'RMB',
    text: '人民币',
  },
]

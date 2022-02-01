import { BillType } from '@/model'

export const billTypes: Omit<BillType, 'id'>[] = [
  {
    icon: '',
    text: '餐饮',
    type: 'outcome',
  },
]

import { BillType } from '../model';

export const billTypes: Omit<BillType, 'id'>[] = [
  {
    icon: '',
    text: '餐饮',
    type: 'outcome',
  },
  {
    icon: '',
    text: '旅游',
    type: 'outcome',
  },
  {
    icon: '',
    text: '电子',
    type: 'outcome',
  },
  {
    icon: '',
    text: '生活',
    type: 'outcome',
  },
  {
    icon: '',
    text: '游玩',
    type: 'income',
  },
  {
    icon: '',
    text: '游玩',
    type: 'income',
  },
];

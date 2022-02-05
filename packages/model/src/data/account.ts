import { Account } from '../model';

export const accounts: Omit<Account, 'id'>[] = [
  {
    name: '默认账本',
    money: 0,
    default: true,
    remark: '',
    icon: '',
  },
];

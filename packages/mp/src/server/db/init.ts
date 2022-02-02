import { accounts, assets, billTypes, users, currencies, bills } from './data'

export const init = [
  {
    name: 'user',
    data: users,
  },
  {
    name: 'account',
    data: accounts,
  },
  {
    name: 'currency',
    data: currencies,
  },
  {
    name: 'bill',
    data: bills,
  },
  {
    name: 'billType',
    data: billTypes,
  },
  {
    name: 'asset',
    data: assets,
  },
]

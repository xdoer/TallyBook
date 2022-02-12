import { accounts, assets, billTypes, users, currencies, bills } from './data';

export * from './model';
export * from './apiName';

export enum tableName {
  user = 'user',
  account = 'account',
  currency = 'currency',
  bill = 'bill',
  billType = 'billType',
  asset = 'asset',
}

export const dataInit = [
  {
    name: tableName.user,
    data: users,
  },
  {
    name: tableName.account,
    data: accounts,
  },
  {
    name: tableName.currency,
    data: currencies,
  },
  {
    name: tableName.bill,
    data: bills,
  },
  {
    name: tableName.billType,
    data: billTypes,
  },
  {
    name: tableName.asset,
    data: assets,
  },
];

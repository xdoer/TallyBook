import { Asset } from '../model';

export const assets: Omit<Asset, 'id'>[] = [
  {
    name: '默认资产',
    isDefault: true,
    type: '',
    icon: '',
  },
];

import { Asset } from '../model';

export const assets: Omit<Asset, 'id'>[] = [
  {
    name: '默认资产',
    isDefault: true,
    money: 0,
    budget: 0,
    delete: false,
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
  },
];

import { BillMainType } from '../billMainType';
import { BillType } from '../model';

export const billTypes: Omit<BillType, 'id'>[] = [
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '餐饮',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '旅游',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '电子',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '生活',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩1',
    type: BillMainType.income,
  },

  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩2',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩3',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩4',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩5',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩6',
    type: BillMainType.income,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩7',
    type: BillMainType.income,
  },

  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩2',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩3',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩4',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩5',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩6',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩7',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩2',
    type: BillMainType.transfer,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩3',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩4',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩5',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩6',
    type: BillMainType.outcome,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    text: '游玩7',
    type: BillMainType.outcome,
  },
];

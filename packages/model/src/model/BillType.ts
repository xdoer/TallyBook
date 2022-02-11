// 账单类型
export class BillType {
  id: string;

  // 账单类型 income / outcome
  type: 'income' | 'outcome' | 'none';

  // 账单 icon
  icon: string;

  // 展示的文字: 餐饮、旅游...
  text: string;

  createdAt?: string;
}

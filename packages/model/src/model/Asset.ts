export class Asset {
  id: string; // 资产 id

  userId: string;

  name: string; // 资产名称

  isDefault: boolean; // 默认资产账户

  icon: string;

  money: number; // 账户总资产

  budget: number; // 消费预算

  cost: number; // 消费金额

  delete: boolean; // 删除不能真正删除，防止已经使用该资产创建了账单，导致数据出异常

  createdAt?: string;
}

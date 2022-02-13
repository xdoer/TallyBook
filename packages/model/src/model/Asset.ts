export class Asset {
  id: string; // 资产 id

  name: string; // 资产名称

  isDefault: boolean; // 默认资产账户

  icon: string;

  money: number;

  budget: number; // 消费预算

  delete: boolean; // 删除不能真正删除，防止已经使用该资产创建了账单，导致数据出异常

  createdAt?: string;
}

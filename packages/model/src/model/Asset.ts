export class Asset {
  id: string; // 资产 id

  name: string; // 资产名称

  type: string; // 资产类型 支付宝、银行卡

  isDefault: boolean; // 默认资产账户

  icon: string;

  money: number;

  createdAt?: string;
}

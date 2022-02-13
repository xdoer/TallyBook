// 账单模型
export class Bill {
  // 账单 ID
  id: string;

  // 账单类型
  typeId: string;

  // 创建人
  userId: string;

  // 账本 id
  accountId: string;

  // 币种 id
  currencyId: string;

  // 资产 id
  assetId: string;

  // 金额
  money: number;

  // 备注
  remark: string;

  // 费用产生时间
  time: string;

  createdAt?: string;
}

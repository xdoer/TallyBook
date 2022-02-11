export class Account {
  id: string; // 账本 id

  name: string; // 账本名称

  isDefault: boolean; // 是默认账本

  money: number; // 账本余额

  icon: string; // 图标

  remark: string; // 备注

  createdAt?: string;
}

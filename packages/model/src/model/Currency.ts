// 币种模型
export class Currency {
  id: string;

  // 符号
  symbol: '￥' | '$' | ({} & string);

  // RMB
  code: string;

  // 名称 人民币
  text: string;

  createdAt?: string;
}

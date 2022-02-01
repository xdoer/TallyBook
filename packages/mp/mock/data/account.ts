import * as faker from '@faker-js/faker'
import { getArray } from '../utils'

export const accounts: any = getArray(() => ({
  id: faker.datatype.uuid(),
  name: faker.finance.accountName,
  money: faker.finance.amount(),
  remark: faker.datatype.string(),
}))

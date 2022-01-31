import * as faker from '@faker-js/faker'
import { getArray } from '../utils'

export const bills: any = getArray(() => ({
  id: faker.datatype.uuid(),
  money: faker.finance.amount(),
  remark: faker.datatype.string()
}))

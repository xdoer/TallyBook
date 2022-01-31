import * as faker from '@faker-js/faker'
import { getArray } from '../utils'

export const users: any = getArray(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
}))

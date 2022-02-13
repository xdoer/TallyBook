import { TallyBook } from '@tally-book/types'
import { dataBaseService } from '../db'

class AccountService {
  async createAccount(
    args: TallyBook.CreateAccount.Args,
    token,
  ): Promise<TallyBook.CreateAccount.Res> {
    const { id: userId } = token.user

    const accountDB = await dataBaseService.account()
    const accounts = await accountDB.get()

    if (args.isDefault && accounts.length) {
      const account = accounts.find((account) => account.isDefault)
      await accountDB.update({ id: account!.id }, { isDefault: false })
    }

    const { name, icon = '', isDefault, remark = '' } = args

    await accountDB.add({ name, icon, isDefault, remark, userId })
    return true
  }
}

export const accountService = new AccountService()

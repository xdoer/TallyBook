import { TallyBook } from '@tally-book/types'
import { dataBaseService } from '../db'

class StatisticsService {
  async statistics(options: TallyBook.Statistics.Args): Promise<TallyBook.Statistics.Res> {
    const billDB = await dataBaseService.bill()
    const bills = await billDB.get()

    let dimension = ''

    return {}
  }
}

export const statisticsService = new StatisticsService()

import { memo } from 'react'
import { SwiperCard } from './SwiperCard'
import { BillList } from './BillList'
import { DatePicker } from './DatePicker'

export const Home = memo(() => {
  return (
    <>
      <DatePicker />
      <SwiperCard />
      <BillList />
    </>
  )
})

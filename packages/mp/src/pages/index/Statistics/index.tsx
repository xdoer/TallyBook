import { memo } from 'react'
import { Overview } from './Overview'
import { TopBar } from './TopBar'

export const Statistics = memo(() => {
  return (
    <>
      <TopBar />
      <Overview />
    </>
  )
})

import { memo } from 'react'
import { Card } from '@/components/Card'
import { ReportCard } from '@/components/ReportCard'
import { AssetList } from './AssetList'

export const Asset = memo(() => {
  return (
    <>
      <Card>
        <ReportCard report={{ title: '净资产', money: 10000 }} />
      </Card>
      <AssetList />
    </>
  )
})

import { View } from '@fower/taro'
import { Card } from '@/components/Card'
import { memo } from 'react'
import { ReportCard } from '@/components/ReportCard'
import { AssetList } from './AssetList'

export const Asset = memo(() => {
  return (
    <>
      <Card>
        <ReportCard report={{ title: '净资产', money: 10000 }} />
      </Card>
      <View py-20 toCenterY toBetween>
        <View fontBold mr-10 text3XL>
          账户资产
        </View>
        <View flex text2XL gray400>
          <View mr-10>余额</View>
          <View>100000</View>
        </View>
      </View>
      <AssetList />
    </>
  )
})

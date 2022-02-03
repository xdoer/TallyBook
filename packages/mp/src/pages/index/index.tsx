import { useState } from 'react'
import { Block, View } from '@fower/taro'
import { Home } from './Home'
import { Asset } from './Asset'
import { Statistics } from './Statistics'
import { TabBar } from './Tabbar'
import { TabBarPageWrapper } from '@/components/TabBarPageWrapper'
import { TabBarPageTitleList } from '@/common/constants'
import { useShare } from '@/store/app'

export default function () {
  const [tabBar, setTabBar] = useState(1)

  useShare()

  return (
    <Block>
      <TabBarPageWrapper title={TabBarPageTitleList[tabBar]}>
        <View hidden={tabBar !== 0}>
          <Asset />
        </View>
        <View hidden={tabBar !== 1}>
          <Home />
        </View>
        <View hidden={tabBar !== 2}>
          <Statistics />
        </View>
      </TabBarPageWrapper>
      <TabBar data={tabBar} onChoose={setTabBar} />
    </Block>
  )
}

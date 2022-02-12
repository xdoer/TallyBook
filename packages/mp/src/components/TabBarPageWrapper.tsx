import { FC } from 'react'
import { View } from '@fower/taro'
import { useSystemInfo } from '@/store/app'
import { OpenData } from '@tarojs/components'
import { FloatNavBar } from './FloatNavBar'
import { popUpService } from '@/service/layer'
import { Setting } from './Setting'

interface TabBarPageWrapperProps {
  title: string
}

export const TabBarPageWrapper: FC<TabBarPageWrapperProps> = ({ children, title }) => {
  const { systemInfo } = useSystemInfo()

  function onSetting() {
    popUpService.open({ content: <Setting /> })
  }

  return (
    <View className="page" pt={systemInfo.navBarHeight + 'px'}>
      <FloatNavBar>{title}</FloatNavBar>
      <View toCenterY justifyContent="space-between">
        <View text7XL fontBold color="#333">
          {title}
        </View>
        <View circle-80 overflowHidden onClick={() => onSetting()}>
          <OpenData type="userAvatarUrl" />
        </View>
      </View>
      {children}
    </View>
  )
}

import { FC } from 'react'
import { View, Image } from '@fower/taro'
import { useSystemInfo } from '@/store/app'
import { FloatNavBar } from './FloatNavBar'
import { popUpService } from '@/service/layer'
import { Setting } from './Setting'
import { loginStore } from '@/store'
import { LayerKey } from '@/common/constants'

interface TabBarPageWrapperProps {
  title: string
}

export const TabBarPageWrapper: FC<TabBarPageWrapperProps> = ({ children, title }) => {
  const { systemInfo } = useSystemInfo()
  const [loginInfo] = loginStore.useState()
  const { user } = loginInfo || {}
  const { avatar } = user || {}

  function onSetting() {
    popUpService.open(<Setting />, LayerKey.setting)
  }

  return (
    <View className="page" pt={systemInfo.navBarHeight + 'px'}>
      <FloatNavBar>{title}</FloatNavBar>
      <View toCenterY justifyContent="space-between">
        <View text7XL fontBold color="#333">
          {title}
        </View>
        <Image src={avatar} circle-80 onClick={() => onSetting()} />
      </View>
      {children}
    </View>
  )
}

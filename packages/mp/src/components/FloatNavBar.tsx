import { FC, useState } from 'react'
import { View } from '@fower/taro'
import { usePageScroll } from '@tarojs/taro'
import { useSystemInfo } from '@/store'

interface FloatNavBarProps {}

export const FloatNavBar: FC<FloatNavBarProps> = ({ children }) => {
  const [show, setShow] = useState(0.01)
  const { systemInfo } = useSystemInfo()
  const { navBarHeight, menuRect } = systemInfo || {}
  const { top } = menuRect || {}
  const base = navBarHeight - 40

  usePageScroll(({ scrollTop }) => {
    if (scrollTop > base && scrollTop < base + 200) {
      const rate = 1 - (base + 200 - scrollTop) / 200
      const formatRate = Number(rate.toFixed(1))
      setShow(formatRate)
    }
  })

  const opacity = (show > 0.5 ? 1 : 0.01) * 100

  return (
    <View
      top0
      left0
      fixed
      w-100p
      bgWhite
      toCenter
      opacity={opacity}
      zIndex={10000}
      pt={top + 'px'}
      h={navBarHeight + 'px'}
      style={{ boxSizing: 'border-box' }}
    >
      {children}
    </View>
  )
}

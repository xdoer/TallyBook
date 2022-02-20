import { FC, memo, useEffect, useMemo } from 'react'
import { useSystemInfo } from '@/store/app'
import { vibrateShort } from '@tarojs/taro'
import { View, Text } from '@fower/taro'
import { list } from './options'
import { layerService } from '@/service/layerService'
import { CreateBill } from '@/components/CreateBill'
import { CreateAsset } from '@/components/CreateAsset'
import './index.scss'
import { LayerKey } from '@/common/constants'

interface TabBarProps {
  data: number
  onChoose: (d: number) => void
}

export const TabBar: FC<TabBarProps> = memo(({ data, onChoose }) => {
  const { systemInfo } = useSystemInfo()
  const { safeArea, windowWidth } = systemInfo || {}
  const { width } = safeArea || {}
  const finalWidth = width || windowWidth

  function onRecord(idx) {
    if (idx === data) {
      if (idx === 1) {
        vibrateShort()
        layerService.open(<CreateBill />, LayerKey.createBill)
      }
      if (idx === 0) {
        vibrateShort()
        layerService.open(<CreateAsset />, LayerKey.createAsset)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      layerService.open(<CreateBill />, LayerKey.createBill)
    }, 1000)
  }, [])

  const { tabBarWidth, itemWidth, indicatorSize } = useMemo(() => {
    const itemWidth = Math.ceil((finalWidth * 0.8) / 3)
    const tabBarWidth = itemWidth * 3
    return { tabBarWidth, itemWidth, indicatorSize }
  }, [finalWidth])

  const indicatorLeft = itemWidth * data + itemWidth / 2 - 25

  return (
    <View className="tab-bar-wrapper">
      <View className="tab-bar" w={tabBarWidth + 'px'} h-50px>
        {list.map((item, index) => {
          const selected = data === index
          const { text, className } = item

          return (
            <View
              key={text}
              w={itemWidth + 'px'}
              className={`item ${selected ? 'active' : ''}`}
              onClick={() => onChoose(index)}
              onLongPress={() => onRecord(index)}
            >
              <Text
                className={`icon iconfont ${
                  selected ? className[className.length - 1] : className[0]
                }`}
                style={{ transform: selected ? 'translateY(-30px)' : undefined }}
              ></Text>
              <Text
                className="text"
                style={{ transform: selected ? 'translateY(-20px)' : undefined }}
              >
                {text}
              </Text>
            </View>
          )
        })}
        <View
          className="indicator"
          circle-50px
          left={indicatorLeft + 'px'}
          top="calc(-50% - 5px)"
        />
      </View>
    </View>
  )
})

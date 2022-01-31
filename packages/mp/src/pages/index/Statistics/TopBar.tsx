import React, { FC, useState } from 'react'
import { View, Image } from '@fower/taro'
import { Tabs } from '@/components/Tabs'

interface TopBarProps { }

export const TopBar: FC<TopBarProps> = ({ }) => {
  const [dimension, setDimension] = useState(1)

  return (
    <View>
      <View toBetween text="12px" color="#333">
        <Tabs options={[{ text: '周' }, { text: '月' }, { text: '年' }]} flex-10 value={dimension} onChange={setDimension} />
        <View ml-15 flex={2}>
          <Item text="筛选" active onClick={() => { }} />
        </View>
      </View>
      <View toBetween toCenterY mt-20>
        <View className="iconfont icon-arrow-left-circle"></View>
        <View text2XL gray600>2021年12月</View>
        <View className="iconfont icon-arrow-right-circle"></View>
      </View>
    </View>
  )
}

interface Item {
  text: string
  active: boolean
  icon?: string
  onClick(): void
}

const Item: FC<Item> = ({ active, text, icon, onClick }) => {
  return (
    <View
      onClick={onClick}
      bgGray500={active}
      white={active}
      rounded-10={active}
      flexAuto
      toCenter
      py-10
    >
      {icon && <Image src={icon} />}
      <View>{text}</View>
    </View>
  )
}

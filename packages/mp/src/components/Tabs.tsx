import React, { CSSProperties, FC } from 'react'
import { View, Image } from '@fower/taro'
import { styled } from '@fower/styled'

export interface TabOption {
  text: string
  icon?: string
}

interface TabsProps {
  options: TabOption[]
  value: number
  onChange(value: number): void
  style?: CSSProperties
}

export const Tabs: FC<TabsProps> = styled(({ options, value, onChange, style }) => {
  return (
    <View row bgBrandLighter rounded-10 justifyContent="space-around" style={style}>
      {options.map((option, idx) => {
        const { text, icon } = option
        const active = idx === value
        return (
          <View
            key={text}
            onClick={() => onChange(idx)}
            bgBrandLightest={active}
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
      })}
    </View>
  )
})

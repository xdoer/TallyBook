import React, { FC } from 'react'
import { View } from '@fower/taro'

interface CardProps { }

export const Card: FC<CardProps> = ({ children }) => {
  return (
    <View p-15 rounded-20 bgWhite h-100p style={{ boxSizing: 'border-box' }}>
      {children}
    </View>
  )
}

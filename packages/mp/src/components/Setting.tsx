import React, { FC } from 'react'
import { View } from '@fower/taro'
import { Cell } from '@taroify/core'

interface MeSettingProps {}

export const Setting: FC<MeSettingProps> = ({}) => {
  return (
    <View minH-30vh maxH-70vh overflowScroll p-15 catchMove>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
      <Cell title="单元格">内容</Cell>
    </View>
  )
}

import React, { FC } from 'react'
import { View } from '@fower/taro'
import { Grid, Tabs } from '@taroify/core'
import { PhotoOutlined } from '@taroify/icons'

interface BillGridProps {}

export const BillGrid: FC<BillGridProps> = ({}) => {
  return (
    <View>
      <Grid columns={5} square>
        <Grid.Item icon={<PhotoOutlined />} text="文字1" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
        <Grid.Item icon={<PhotoOutlined />} text="文字" />
      </Grid>
    </View>
  )
}

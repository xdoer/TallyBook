import React, { FC } from 'react'
import { View } from '@fower/taro'
import { Cell } from '@taroify/core'
import { PLATFORM } from '@/store/app'

interface MeSettingProps {}

export const Setting: FC<MeSettingProps> = ({}) => {
  const [env, setEnv] = PLATFORM.useState()

  function onChange(x: keyof typeof env) {
    setEnv(
      Object.keys(env).reduce((t, c) => {
        t[c] = c === x
        return t
      }, {} as any),
    )
  }

  return (
    <View minH-30vh maxH-70vh overflowScroll p-15 catchMove>
      <Cell title="单元格" onClick={() => onChange('isLocal')}>
        Local
      </Cell>
      <Cell title="单元格" onClick={() => onChange('isWxCloud')}>
        WxCloud
      </Cell>
      <Cell title="单元格" onClick={() => onChange('isServer')}>
        Server
      </Cell>
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

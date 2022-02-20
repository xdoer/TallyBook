import React, { FC } from 'react'
import { Form, Input } from '@taroify/core'

interface MoneyFiledProps {}

export const MoneyFiled: FC<MoneyFiledProps> = ({}) => {
  return (
    <Form.Item name="money" rules={[{ required: true, message: '请填写金额' }]}>
      <Form.Label>金额</Form.Label>
      <Form.Control>
        <Input placeholder="输入金额" type="digit" />
      </Form.Control>
    </Form.Item>
  )
}

import { FC } from 'react'
import { Textarea, Form } from '@taroify/core'

interface RemarkFiledProps {}

export const RemarkFiled: FC<RemarkFiledProps> = ({}) => {
  return (
    <Form.Item name="RemarkFiled">
      <Form.Label>备注</Form.Label>
      <Form.Control>
        <Textarea style={{ height: '48px' }} limit={50} placeholder="请输入备注" />
      </Form.Control>
    </Form.Item>
  )
}

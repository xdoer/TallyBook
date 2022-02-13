import { FC } from 'react'
import { View } from '@fower/taro'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { popUpService } from '@/service/layer'
import { Form, Cell, Input, Button, Switch, Toast } from '@taroify/core'
import { BaseEventOrig, FormProps } from '@tarojs/components'
import { TallyBook } from '@tally-book/types'

interface CreateAssetProps {}

export const CreateAsset: FC<CreateAssetProps> = ({}) => {
  async function onSubmit(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
    const { money, budget, ...rest } = event.detail.value as TallyBook.CreateAsset.Args
    const { success } = await apiService.createAsset({
      ...rest,
      money: Number(money),
      budget: Number(budget),
    })
    if (success) {
      await useQuery.get(ApiName.GetAssets).toFetch()
      popUpService.close()
    } else {
      Toast.open('创建失败')
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item name="name" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>资产名称</Form.Label>
          <Form.Control>
            <Input placeholder="请输入名称" />
          </Form.Control>
        </Form.Item>
        <Form.Item name="money" rules={[{ required: true, message: '请输入资产总额' }]}>
          <Form.Label>资产总额</Form.Label>
          <Form.Control>
            <Input placeholder="请输入数字" type="digit" />
          </Form.Control>
        </Form.Item>
        <Form.Item name="budget" rules={[{ required: true, message: '请输入消费预算' }]}>
          <Form.Label>消费预算</Form.Label>
          <Form.Control>
            <Input placeholder="请输入数字" type="digit" />
          </Form.Control>
        </Form.Item>
        <Form.Item name="isDefault">
          <Form.Label>设为默认</Form.Label>
          <Form.Control>
            <Switch size={20} />
          </Form.Control>
        </Form.Item>
      </Cell.Group>
      <View style={{ margin: '16px' }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}

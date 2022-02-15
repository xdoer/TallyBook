import { FC, useState } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { popUpService } from '@/service/layer'
import { Form, Cell, Input, Button, Switch, Toast } from '@taroify/core'
import { BaseEventOrig, FormProps } from '@tarojs/components'
import { LayerKey } from '@/common/constants'

interface BillDetailProps {
  id: string
}

export const BillDetail: FC<BillDetailProps> = ({ id }) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBill.Res>>(
    ApiName.GetBill,
    {
      params: { id },
    },
    { deps: [id] },
  )
  const [readOnly, setReadOnly] = useState(true)

  async function onDelete() {
    const { success } = await apiService.removeBill({ id })
    if (success) {
      useQuery.get(ApiName.GetBills).toFetch()
      useQuery.get(ApiName.GetAssets).toFetch()
    }
    popUpService.close(LayerKey.billDetail)
  }

  function onSubmit(e) {
    console.log('保存2', e)

    popUpService.close(LayerKey.billDetail)
  }

  const bill = response?.result || {}

  return (
    <Form onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item name="money" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>金额</Form.Label>
          <Form.Control>
            <Input
              placeholder="请输入金额"
              type="digit"
              disabled={readOnly}
              value={'' + bill.money}
            />
          </Form.Control>
        </Form.Item>

        <Form.Item name="type" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>类型</Form.Label>
          <Form.Control>
            <Input
              placeholder="请输入账本名称"
              type="digit"
              disabled={readOnly}
              value={'' + bill.type?.text}
            />
          </Form.Control>
        </Form.Item>

        <Form.Item name="account" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>账本</Form.Label>
          <Form.Control>
            <Input
              placeholder="请输入账本名称"
              type="digit"
              disabled={readOnly}
              value={'' + bill.account?.name}
            />
          </Form.Control>
        </Form.Item>

        <Form.Item name="asset" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>资产</Form.Label>
          <Form.Control>
            <Input
              placeholder="请输入金额"
              type="digit"
              disabled={readOnly}
              value={'' + bill.asset?.name}
            />
          </Form.Control>
        </Form.Item>
      </Cell.Group>
      <View m-16px flex>
        <Button shape="round" block color="danger" onClick={() => onDelete()}>
          删除
        </Button>
        {readOnly ? (
          <Button shape="round" block color="primary" onClick={() => setReadOnly(false)}>
            编辑
          </Button>
        ) : (
          <Button shape="round" block color="primary" formType="submit">
            保存
          </Button>
        )}
      </View>
    </Form>
  )
}

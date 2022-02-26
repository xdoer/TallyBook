import { FC, useRef, useState } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { layerService } from '@/service/layerService'
import { Form, Cell, Input, Button } from '@taroify/core'
import { LayerKey } from '@/common/constants'
import { FormInstance } from '@taroify/core/form/form.shared'

interface BillDetailProps {
  id: string
}

export const BillDetail: FC<BillDetailProps> = ({ id }) => {
  useQuery<TallyBook.GetBill.Res>(
    ApiName.GetBill,
    {
      params: { id },
    },
    {
      deps: [id],
      onUpdate(_, cur) {
        const bill = cur?.result || {}

        formRef.current.setValues({
          money: bill.money,
          type: bill.type?.text,
          account: bill.account?.name,
          asset: bill.asset?.name,
        })

        return cur
      },
    },
  )
  const [readOnly, setReadOnly] = useState(true)
  const formRef = useRef<FormInstance>({} as any)

  async function onDelete() {
    const { success } = await apiService.removeBill({ id })
    if (success) {
      useQuery.get(ApiName.GetBills).toFetch()
      useQuery.get(ApiName.GetAssets).toFetch()
    }
    layerService.close(LayerKey.billDetail)
  }

  function onSubmit(e) {
    layerService.close(LayerKey.billDetail)
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <Cell.Group inset>
        <Form.Item name="money" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>金额</Form.Label>
          <Form.Control>
            <Input placeholder="请输入金额" type="digit" disabled={readOnly} />
          </Form.Control>
        </Form.Item>

        <Form.Item name="type" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>类型</Form.Label>
          <Form.Control>
            <Input placeholder="请输入账本名称" type="digit" disabled={readOnly} />
          </Form.Control>
        </Form.Item>

        <Form.Item name="account" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>账本</Form.Label>
          <Form.Control>
            <Input placeholder="请输入账本名称" type="digit" disabled={readOnly} />
          </Form.Control>
        </Form.Item>

        <Form.Item name="asset" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Form.Label>资产</Form.Label>
          <Form.Control>
            <Input placeholder="请输入金额" type="digit" disabled={readOnly} />
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

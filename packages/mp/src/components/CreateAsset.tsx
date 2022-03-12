import { FC, useEffect, useRef } from 'react'
import { View } from '@fower/taro'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { layerService } from '@/service/layerService'
import { Form, Cell, Input, Button, Switch, Toast } from '@taroify/core'
import { BaseEventOrig, FormProps } from '@tarojs/components'
import { TallyBook } from '@tally-book/types'
import { LayerKey } from '@/common/constants'
import { FormInstance } from '@taroify/core/form/form.shared'

interface CreateAssetProps {
  id?: string
}

export const CreateAsset: FC<CreateAssetProps> = ({ id }) => {
  const isEdit = !!id
  const { response } = useQuery<TallyBook.GetAsset.Res>(
    ApiName.GetAsset,
    () => {
      if (!id) throw new Error()
      return {
        params: {
          id,
        },
      }
    },
    {
      deps: [id],
    },
  )
  const formRef = useRef<FormInstance>()

  useEffect(() => {
    if (response?.success) {
      const { result } = response
      const { name, isDefault, money, budget } = result

      formRef.current?.setValues({
        name,
        isDefault,
        money,
        budget,
      })
    }
  }, [response])

  function createAsset(event) {
    const { money, budget, ...rest } = event.detail.value as any
    return apiService.createAsset({
      ...rest,
      money: Number(money),
      budget: Number(budget),
    })
  }

  function updateAsset(event) {
    const { money, budget, ...rest } = event.detail.value as any
    return apiService.updateAsset({
      id: id!,
      ...rest,
      money: Number(money),
      budget: Number(budget),
    })
  }

  async function onSubmit(event: BaseEventOrig<FormProps.onSubmitEventDetail>) {
    const { success } = isEdit ? await updateAsset(event) : await createAsset(event)
    if (success) {
      await useQuery.get(ApiName.GetAssets).toFetch()
      layerService.close(LayerKey.createAsset)
    } else {
      Toast.open('创建失败')
    }
  }

  // 重置表单
  function onReset() {
    formRef.current?.reset()
  }

  return (
    <View pb-500>
      <Form ref={formRef} onSubmit={onSubmit}>
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
        <View fixed bottom0 left0 right0 m-16px flex justifyContent="space-between">
          <Button
            shape="round"
            block
            size="medium"
            style={{ marginRight: '10px' }}
            onClick={() => onReset()}
          >
            重置
          </Button>
          <Button
            shape="round"
            block
            color="primary"
            style={{ marginLeft: '10px' }}
            size="medium"
            formType="submit"
          >
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
}

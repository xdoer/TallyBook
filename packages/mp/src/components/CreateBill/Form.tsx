import Taro from '@tarojs/taro'
import { View } from '@fower/taro'
import { FC, useEffect, useRef } from 'react'
import { Form, Button } from '@taroify/core'
import { BillTypeFiled, TimeField, MoneyFiled, RemarkFiled, AssetFiled } from './FormItem'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'
import { FormInstance } from '@taroify/core/form/form.shared'

interface BillFormProps {
  id?: string
  idx: number
  data: TallyBook.GetBillTypes.Res
  onTabChange(v: number): void
  submitCallback?(): void
}

export const BillForm: FC<BillFormProps> = ({ id, data, idx, onTabChange, submitCallback }) => {
  const isEdit = !!id
  const { response } = useQuery<TallyBook.GetBill.Res>(
    ApiName.GetBill,
    () => {
      if (!id) throw new Error()
      return { params: { id } }
    },
    { deps: [id] },
  )

  const formRef = useRef<FormInstance>()

  // 初始化数据
  useEffect(() => {
    if (response?.success) {
      const { result } = response
      const { money, type, asset, remark, time } = result

      formRef.current?.setValues({
        money: money,
        billType: type,
        asset,
        remark,
        time,
      })

      const find = data.grid.find((i) => i.id === type.id)
      find && onTabChange(idx)
    }
  }, [response])

  // 编辑账单
  async function updateBill(e) {
    const { billType, asset, money, time } = e.detail.value
    return apiService.updateBill({
      id: response.result.id,
      typeId: billType.id,
      assetId: asset.id,
      money: money,
      time: time,
    })
  }

  // 创建账单
  async function createBill(e) {
    const { billType, asset, money, time, remark } = e.detail.value

    return apiService.createBill({
      typeId: billType.id,
      assetId: asset.id,
      money: money,
      time: time,
      remark,
    })
  }

  // 提交
  async function onSubmit(e) {
    const res = isEdit ? await updateBill(e) : await createBill(e)
    if (res.success) {
      useQuery.get(ApiName.GetBills).toFetch()
      submitCallback?.()
      close()
    }
  }

  // 重置表单
  function onReset() {
    formRef.current?.reset()
  }

  function close() {
    layerService.close(LayerKey.createBill)
  }

  return (
    <Form ref={formRef} onSubmit={onSubmit}>
      <BillTypeFiled data={data} />
      <MoneyFiled />
      <TimeField />
      <AssetFiled />
      <RemarkFiled />
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
  )
}

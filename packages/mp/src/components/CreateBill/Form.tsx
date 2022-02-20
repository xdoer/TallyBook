import Taro from '@tarojs/taro'
import { View } from '@fower/taro'
import { FC } from 'react'
import { Form, Button } from '@taroify/core'
import { BillTypeFiled, TimeField, MoneyFiled } from './FormItem'
import { TallyBook } from '@tally-book/types'
import { AssetFiled } from './FormItem/Asset'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'

interface BillFormProps {
  data: TallyBook.GetBillTypes.Res
}

export const BillForm: FC<BillFormProps> = ({ data }) => {
  async function onSubmit(e) {
    const { billType, asset, money, time } = e.detail.value
    const res = await apiService.createBill({
      typeId: billType.id,
      assetId: asset.id,
      money: money,
      time: time,
    })

    if (res.success) {
      useQuery.get(ApiName.GetBills).toFetch()
      layerService.close(LayerKey.createBill)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <BillTypeFiled data={data} />
      <TimeField />
      <MoneyFiled />
      <AssetFiled />
      <View style={{ margin: '16px' }}>
        <Button shape="round" block color="primary" formType="submit">
          提交
        </Button>
      </View>
    </Form>
  )
}

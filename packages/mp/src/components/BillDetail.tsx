import { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName, BillType } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { Button, Cell } from '@taroify/core'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'
import { CreateBill } from './CreateBill'

interface BillDetailProps {
  id: string
}

export const BillDetail: FC<BillDetailProps> = ({ id }) => {
  const { response, toFetch } = useQuery<TallyBook.GetBill.Res>(
    ApiName.GetBill,
    {
      params: { id },
    },
    {
      deps: [id],
    },
  )
  const { money, type, asset, remark } = response?.result || {}
  const { billTypeSymbol, billTypeText, billTypeTitle } = getTypeText(type)

  async function onDelete() {
    try {
      const res = await apiService.removeBill({ id })
      if (res.success) {
        useQuery.get(ApiName.GetBills).toFetch()
        useQuery.get(ApiName.GetAssets).toFetch()
        useQuery.get(ApiName.Statistics).toFetch()
        layerService.close(LayerKey.billDetail)
      }
    } catch (e) {
      console.log('删除失败', e)
    }
  }

  function onEdit() {
    layerService.open(<CreateBill id={id} submitCallback={() => toFetch()} />, LayerKey.createBill)
  }

  return (
    <View px-30 pt-100 pb-200 relative>
      <View toCenter minH-100rpx text9XL red500>
        {billTypeSymbol}
        {money}
      </View>
      <Cell title={billTypeTitle}>{billTypeText}</Cell>
      <Cell title="资产">{asset?.name}</Cell>
      <Cell title="备注">{remark}</Cell>

      <View toAround fixed bottom-30 left0 right0>
        <Button shape="round" block onClick={onDelete} style={{ margin: '10px' }}>
          删除
        </Button>
        <Button shape="round" onClick={onEdit} color="primary" block style={{ margin: '10px' }}>
          编辑
        </Button>
      </View>
    </View>
  )
}

function getTypeText(billType: BillType) {
  let symbol = '',
    title = ''

  switch (billType?.type) {
    case 'outcome': {
      symbol = '-'
      title = '支出类型'
      break
    }
    case 'income': {
      symbol = '+'
      title = '收入类型'
    }
  }

  return {
    billTypeSymbol: symbol,
    billTypeTitle: title,
    billTypeText: billType?.text,
  }
}

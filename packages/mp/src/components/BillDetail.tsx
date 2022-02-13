import { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { popUpService } from '@/service/layer'

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

  async function onDelete() {
    const { success } = await apiService.removeBill({ id })
    if (success) {
      useQuery.get(ApiName.GetBills).toFetch()
      useQuery.get(ApiName.GetAssets).toFetch()
    }
    popUpService.close()
  }

  return (
    <View minH-400>
      <View onClick={onDelete}>删除</View>
      {JSON.stringify(response?.result)}
    </View>
  )
}

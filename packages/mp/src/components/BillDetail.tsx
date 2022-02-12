import React, { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

interface BillDetailProps {
  id: string
}

export const BillDetail: FC<BillDetailProps> = ({ id }) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBill.Res>>(
    ApiName.GetBill,
    () => {
      if (!id) throw new Error('no id')
      return {
        params: { id },
      }
    },
    { deps: [id] },
  )

  return <View minH-400>{JSON.stringify(response?.result)}</View>
}

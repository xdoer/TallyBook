import React, { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

interface AssetDetailProps {
  id: string
}

export const AssetDetail: FC<AssetDetailProps> = ({ id }) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetAsset.Res>>(
    ApiName.GetAsset,
    {
      params: { id },
    },
    { deps: [id] },
  )

  console.log(response?.result)

  return <View minH-400>{JSON.stringify(response?.result)}</View>
}

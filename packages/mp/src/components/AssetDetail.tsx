import { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'

interface AssetDetailProps {
  id: string
}

export const AssetDetail: FC<AssetDetailProps> = ({ id }) => {
  const { response } = useQuery<TallyBook.GetAsset.Res>(
    ApiName.GetAsset,
    {
      params: { id },
    },
    { deps: [id] },
  )

  async function onDelete() {
    const res = await apiService.removeAsset({ id })
    console.log(res)
    if (res.success) {
      await useQuery.get(ApiName.GetAssets).toFetch()
      layerService.close(LayerKey.assetDetail)
    }
  }

  return (
    <View minH-400>
      <View onClick={() => onDelete()}>删除</View>
      {JSON.stringify(response?.result)}
    </View>
  )
}

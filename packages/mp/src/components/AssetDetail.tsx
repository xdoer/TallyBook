import { FC } from 'react'
import { View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { apiService } from '@/service/apiService'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'
import { Button, Cell } from '@taroify/core'
import { CreateAsset } from './CreateAsset'

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
    if (res.success) {
      await useQuery.get(ApiName.GetAssets).toFetch()
      layerService.close(LayerKey.assetDetail)
    }
  }

  async function onEdit() {
    layerService.open(<CreateAsset id={id} />, LayerKey.createAsset)
  }

  const { name, money, budget, isDefault, cost } = response?.result || {}

  return (
    <View minH-400>
      <View px-30 pt-100 pb-200 relative>
        <Cell title="资产名称">{name}</Cell>
        <Cell title="默认资产">{isDefault ? 'true' : 'false'}</Cell>
        <Cell title="消费">{cost}</Cell>
        <Cell title="预算">{budget}</Cell>
        <Cell title="总资产">{money}</Cell>

        <View toAround fixed bottom-30 left0 right0>
          <Button shape="round" block onClick={onDelete} style={{ margin: '10px' }}>
            删除
          </Button>
          <Button shape="round" onClick={onEdit} color="primary" block style={{ margin: '10px' }}>
            编辑
          </Button>
        </View>
      </View>
    </View>
  )
}

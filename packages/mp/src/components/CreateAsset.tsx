import React, { FC } from 'react'
import { View } from '@fower/taro'
import { apiService } from '@/service/apiService'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { popUpService } from '@/service/layer'

interface CreateAssetProps {}

export const CreateAsset: FC<CreateAssetProps> = ({}) => {
  async function createAsset() {
    await apiService.createAsset({})
    await useQuery.get(ApiName.GetAssets).toFetch()
    popUpService.close()
  }

  return <View minH-400>创建资产账户</View>
}

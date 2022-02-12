import { FC } from 'react'
import { Image, View } from '@fower/taro'
import { Card } from '@/components/Card'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

interface AssetListProps {}

export const AssetList: FC<AssetListProps> = ({}) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetAssets.Res>>(ApiName.GetAssets)
  const list = response?.result || []

  return (
    <Card>
      {list.map((item, idx) => {
        const { icon, name, type, money } = item
        return (
          <View
            toBetween
            toCenterY
            key={type}
            p-30
            borderBottom="1px solid transparent"
            borderBottomGray100={idx !== list.length - 1}
          >
            <View toCenterY>
              <Image src={icon} circle-60 mr-20 />
              <View text3XL gray500>
                <View text2XL gray500>
                  {name}
                </View>
                <View textXL gray400>
                  {type}
                </View>
              </View>
            </View>
            <View text2XL gray500>
              {money}
            </View>
          </View>
        )
      })}
    </Card>
  )
}

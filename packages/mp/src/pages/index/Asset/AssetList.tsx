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
  const money = list.reduce((t, c) => t + c.money, 0)

  return (
    <>
      <View py-20 toCenterY toBetween>
        <View fontBold mr-10 text3XL>
          账户资产
        </View>
        <View flex text2XL gray400>
          <View mr-10>余额</View>
          <View>{money}</View>
        </View>
      </View>
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
    </>
  )
}

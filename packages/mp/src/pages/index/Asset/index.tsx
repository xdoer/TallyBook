import { memo } from 'react'
import { Card } from '@/components/Card'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'
import { Image, View } from '@fower/taro'
import { layerService } from '@/service/layerService'
import { AssetDetail } from '@/components/AssetDetail'
import { LayerKey } from '@/common/constants'

export const Asset = memo(() => {
  const { response } = useQuery<TallyBook.GetAssets.Res>(ApiName.GetAssets)
  const list = response?.result || []

  let money = 0,
    budget = 0,
    cost = 0

  list.forEach((i) => {
    money += i.money
    budget += i.budget
    cost += i.cost
  })

  return (
    <>
      <Card>
        <View p-15>
          <View brandPrimary>净资产</View>
          <View text6XL fontBold my-10>
            ￥{money - cost}
          </View>
          <View flex text2XL>
            <View flex mr-30>
              <View gray500 fontBold mr-5>
                总资产
              </View>
              <View gray400>{money}</View>
            </View>
            <View flex mr-30>
              <View gray500 fontBold mr-5>
                总预算
              </View>
              <View gray400>{budget}</View>
            </View>
            <View flex>
              <View gray500 fontBold mr-5>
                剩余预算
              </View>
              <View gray400>{budget - cost}</View>
            </View>
          </View>
        </View>
      </Card>
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
          const { icon, name, money, id, cost } = item
          return (
            <View
              toBetween
              toCenterY
              key={id}
              p-30
              borderBottom="1px solid transparent"
              borderBottomGray100={idx !== list.length - 1}
              onClick={() => {
                layerService.open(<AssetDetail id={id} />, LayerKey.assetDetail)
              }}
            >
              <View toCenterY>
                <Image src={icon} circle-60 mr-20 />
                <View text3XL gray500>
                  <View text2XL gray500>
                    {name}
                  </View>
                </View>
              </View>
              <View text2XL gray500>
                {money - cost}
              </View>
            </View>
          )
        })}
      </Card>
    </>
  )
})

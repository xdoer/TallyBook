import { FC } from 'react'
import { View } from '@fower/taro'
import { Card } from '@/components/Card'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

interface OverviewProps {}

export const Overview: FC<OverviewProps> = ({}) => {
  const { response } = useQuery<TallyBook.Statistics.Res>(ApiName.Statistics, () => {
    const d = new Date()
    return {
      params: {
        time: {
          year: d.getFullYear(),
        },
      },
    }
  })
  const { money = 0, cost = 0, budget = 0 } = response?.result || {}

  return (
    <View>
      <View py-20 toCenterY>
        <View fontBold text3XL>
          总览
        </View>
      </View>
      <View mb-20>
        <Card>
          <View p-15>
            <View brandPrimary>收支记录</View>
            <View row toBetween mt-20>
              <View>
                <View gray400 text2XL>
                  支出
                </View>
                <View gray500 text4XL>
                  {money}
                </View>
              </View>
              <View>
                <View gray400 text2XL>
                  收入
                </View>
                <View gray500 text4XL>
                  {cost}
                </View>
              </View>
              <View>
                <View gray400 text2XL>
                  结余
                </View>
                <View gray500 text4XL>
                  {budget}
                </View>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}

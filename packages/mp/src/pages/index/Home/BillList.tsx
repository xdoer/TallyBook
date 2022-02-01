import React, { FC } from 'react'
import { Image, View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { formatDate } from '@/common/utils'
import { Card } from '@/components/Card'

interface BillListProps {}

export const BillList: FC<BillListProps> = ({}) => {
  const { data: _ } = useQuery({ path: '/bills' })

  return (
    <View mt-20>
      {data.map((t) => {
        const { date, list } = t
        return (
          <View key={date} mb-30>
            <View toBetween text2XL gray500 mb-15>
              <View flex>
                <View mr-10>{formatDate(new Date(), 'MM/dd')}</View>
                <View>星期六</View>
              </View>
              <View flex>
                <View mr-10>支出:</View>
                <View>10000</View>
              </View>
            </View>
            <Card>
              {list.map((i, idx) => {
                const { icon, type, money } = i
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
                        {type}
                      </View>
                    </View>
                    <View textRight>
                      <View text2XL gray500>
                        {money}
                      </View>
                      <View textXL gray400>
                        现金
                      </View>
                    </View>
                  </View>
                )
              })}
            </Card>
          </View>
        )
      })}
    </View>
  )
}

const data = [
  {
    date: '2021-12-01',
    list: [
      {
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
        type: '餐饮',
        money: '25',
      },
      {
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
        type: '餐饮',
        money: '26',
      },
    ],
  },
  {
    date: '2021-12-02',
    list: [
      {
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
        type: '餐饮',
        money: '25',
      },
      {
        icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
        type: '餐饮',
        money: '26',
      },
    ],
  },
]

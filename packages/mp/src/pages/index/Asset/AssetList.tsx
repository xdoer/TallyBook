import React, { FC } from 'react'
import { Image, View } from '@fower/taro'
import { Card } from '@/components/Card'

interface AssetListProps {}

export const AssetList: FC<AssetListProps> = ({}) => {
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

const list = [
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    name: 'haha',
    type: '现金',
    money: 10000,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    name: 'haha',
    type: '现金',
    money: 10000,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    name: 'haha',
    type: '现金',
    money: 10000,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    name: 'haha',
    type: '现金',
    money: 10000,
  },
  {
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0173f65e47c9d4a80120a8950572bd.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642497965&t=5fdcc069c2c0db464db8fe2bde413f69',
    name: 'haha',
    type: '现金',
    money: 10000,
  },
]

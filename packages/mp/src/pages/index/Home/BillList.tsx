import { FC, useState } from 'react'
import { Image, View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { formatDate } from '@/common/utils'
import { Card } from '@/components/Card'
import { TallyBook } from '@tally-book/types'
import { useReachBottom } from '@tarojs/taro'
import { groupBy } from 'lodash-es'
import { Bill } from '@tally-book/model'

interface BillListProps {}

interface D {
  date: string
  money: number
  list: Bill[]
}

export const BillList: FC<BillListProps> = ({}) => {
  const [data, setData] = useState<D[]>([])
  const [pageNo, setPageNo] = useState(0)
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBills.Res>>(
    '/getBills',
    {
      params: { pageNo, pageSize: 10 },
    },
    {
      deps: [pageNo],
      onUpdate(_, cur) {
        const x = groupBy(cur.result.list, (i) => formatDate(new Date(i.createdAt!), 'yyyy-MM-dd'))
        const find = data.find((i) => x[i.date])
        if (find) {
          const newList = x[find.date]
          const money = newList.reduce((t, c) => t + c.money, 0)
          find.list = find.list.concat(newList)
          find.money += money
          setData([...data])
        } else {
          setData(
            data.concat(
              Object.keys(x).map((i) => ({
                date: i,
                money: x[i].reduce((t, c) => t + c.money, 0),
                list: x[i],
              })),
            ),
          )
        }

        return cur
      },
    },
  )

  useReachBottom(() => {
    if (response.result.hasNext) {
      setPageNo((i) => i + 1)
    }
  })

  return (
    <View mt-20>
      {data.map((t) => {
        const { date, list } = t
        const tt = new Date(date)
        const idx = tt.getDay()
        const money = list.reduce((t, c) => t + c.money, 0)

        return (
          <View key={date} mb-30>
            <View toBetween text2XL gray500 mb-15>
              <View flex>
                <View mr-10>{formatDate(tt, 'MM/dd')}</View>
                <View>星期{['日', '一', '二', '三', '四', '五', '六'][idx]}</View>
              </View>
              <View flex>
                <View mr-10>支出:</View>
                <View>{money}</View>
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

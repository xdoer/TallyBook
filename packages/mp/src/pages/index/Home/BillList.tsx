import { FC, useState } from 'react'
import { Image, View } from '@fower/taro'
import { useQuery } from '@/common/request'
import { formatDate } from '@/common/utils'
import { Card } from '@/components/Card'
import { TallyBook } from '@tally-book/types'
import { useReachBottom } from '@tarojs/taro'
import { formatBills } from '@/function/formatBills'
import { billListStore } from '@/store'
import { ApiName } from '@tally-book/model'
import { popUpService } from '@/service/layer'
import { BillDetail } from '@/components/BillDetail'

interface BillListProps {}

export const BillList: FC<BillListProps> = ({}) => {
  const [data, setData] = billListStore.useState()
  const [pageNo, setPageNo] = useState(0)
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBills.Res>>(
    ApiName.GetBills,
    {
      params: { pageNo, pageSize: 10 },
    },
    {
      deps: [pageNo],
      onUpdate(_, cur) {
        setData(formatBills(cur.result.list, data))
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
      {data.map((t, pIdx) => {
        const { date, list, money } = t
        const tt = new Date(date)

        return (
          <View key={date} mb-30>
            <View toBetween text2XL gray500 mb-15>
              <View flex>
                <View mr-10>{formatDate(tt, 'MM/dd')}</View>
                <View>星期{['日', '一', '二', '三', '四', '五', '六'][tt.getDay()]}</View>
              </View>
              <View flex>
                <View mr-10>支出:</View>
                <View>{money}</View>
              </View>
            </View>
            <Card>
              {list.map((i, cIdx) => {
                const { id, type, money } = i
                const { icon, text } = type
                return (
                  <View
                    toBetween
                    toCenterY
                    key={id}
                    p-30
                    borderBottom="1px solid transparent"
                    borderBottomGray100={cIdx !== list.length - 1}
                    onClick={() => {
                      popUpService.open({
                        content: <BillDetail id={id} pIdx={pIdx} cIdx={cIdx} />,
                      })
                    }}
                  >
                    <View toCenterY>
                      <Image src={icon} circle-60 mr-20 />
                      <View text2XL gray500>
                        {text}
                      </View>
                    </View>
                    <View textRight>
                      <View text2XL gray500>
                        {type.type === 'income' && '+'}
                        {type.type === 'outcome' && '-'}
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

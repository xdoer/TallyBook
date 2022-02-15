import { memo, useEffect, useState } from 'react'
import { Card } from '@/components/Card'
import { popUpService } from '@/service/layer'
import { YearMonthPicker } from '@/components/YearMonthPicker'
import { Arrow } from '@taroify/icons'
import { View, Image } from '@fower/taro'
import { useQuery } from '@/common/request'
import { formatDate, getTime } from '@/common/utils'
import { TallyBook } from '@tally-book/types'
import { formatBills, getMoney } from '@/function/formatBills'
import { BillDetail } from '@/components/BillDetail'
import { ApiName } from '@tally-book/model'
import { LayerKey } from '@/common/constants'

export const Home = memo(() => {
  const [date, setDate] = useState(new Date())
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBills.Res>>(
    ApiName.GetBills,
    () => {
      const { month, year } = getTime(new Date(date))
      return {
        params: { time: { month, year } },
      }
    },
    {
      deps: [date],
    },
  )
  const data = formatBills(response?.result, [])
  const money = getMoney(response?.result || [])
  const income = getMoney(response?.result || [], 'income')
  const outcome = getMoney(response?.result || [], 'outcome')

  function chooseDate() {
    popUpService.open(LayerKey.datePicker, <YearMonthPicker value={date} onConfirm={setDate} />)
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     const id = data[0].list[0].id
  //     popUpService.open(LayerKey.billDetail, <BillDetail id={id} />)
  //   }, 500)
  // }, [data])

  return (
    <>
      <View py-20 onClick={() => chooseDate()} toCenterY>
        <View fontBold mr-10 text3XL>
          {formatDate(date, 'yyyy年MM月')}
        </View>
        <Arrow />
      </View>
      <Card>
        <View p-15>
          <View brandPrimary>收支</View>
          <View text6XL fontBold my-10>
            ￥{money}
          </View>
          <View flex text2XL>
            <View flex mr-30>
              <View gray500 fontBold mr-5>
                总收入
              </View>
              <View gray400>{income}</View>
            </View>
            <View flex>
              <View gray500 fontBold mr-5>
                总消费
              </View>
              <View gray400>{outcome}</View>
            </View>
          </View>
        </View>
      </Card>

      <View mt-20>
        {data.map((t) => {
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
                  <View mr-10>{money < 0 ? '支出' : '收入'}:</View>
                  <View>{Math.abs(money)}</View>
                </View>
              </View>
              <Card>
                {list.map((i, idx) => {
                  const { id, type, money } = i
                  const { icon, text } = type
                  return (
                    <View
                      toBetween
                      toCenterY
                      key={id}
                      p-30
                      borderBottom="1px solid transparent"
                      borderBottomGray100={idx !== list.length - 1}
                      onClick={() => {
                        popUpService.open(LayerKey.billDetail, <BillDetail id={id} />)
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
    </>
  )
})

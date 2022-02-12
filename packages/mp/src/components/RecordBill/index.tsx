import { FC, useState, memo } from 'react'
import { View, Image } from '@fower/taro'
import { Keyboard } from './Keyboard'
import { Tabs, Grid, Toast } from '@taroify/core'
import { useQuery } from '@/common/request'
import { apiService } from '@/service/apiService'
import { TallyBook } from '@tally-book/types'
import { loginStore } from '@/store/login'
import { formatBills } from '@/function/formatBills'
import { billListStore } from '@/store'
import { ApiName } from '@tally-book/model'
import Taro from '@tarojs/taro'
import { popUpService } from '@/service/layer'

interface RecordBillProps {}

export const RecordBill: FC<RecordBillProps> = memo(({}) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBillTypes.Res[]>>(
    ApiName.GetBillTypes,
  )
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(0)
  const [money, setMoney] = useState('')
  const result = response?.result || []

  function onTabChange(e) {
    setTab(e)
    setSelected(0)
  }

  function onHide() {
    popUpService.close()
    setMoney('')
  }

  async function onConfirm() {
    if (!money) return Toast.open('请输入金额')

    const { user, account, asset } = loginStore.getState()
    const res = await apiService.createBill({
      typeId: result[tab].grid[selected].id,
      userId: user.id,
      accountId: account.id,
      assetId: asset.id,
      money: Number.parseInt(money),
    })

    billListStore.setState(formatBills([res.result], billListStore.getState()))
  }

  return (
    <View className="record-bill" minH-500 maxH-700 overflowScroll relative pb-500>
      <Tabs value={tab} onChange={onTabChange}>
        {result.map((option) => {
          const { value, grid, type } = option
          const key = `${type}-${value}`

          return (
            <Tabs.TabPane key={key} title={value} style={{ padding: '10px' }}>
              <Grid columns={4} square>
                {grid.map((i, idx) => {
                  const { text, icon } = i
                  const active = selected === idx

                  return (
                    <Grid.Item
                      key={i.id}
                      icon={<Image src={icon} circle-50 />}
                      text={text}
                      style={{ border: `1px solid ${active ? 'red' : 'transparent'}` }}
                      onClick={() => setSelected(idx)}
                    />
                  )
                })}
              </Grid>
            </Tabs.TabPane>
          )
        })}
      </Tabs>
      <Keyboard value={money} onChange={setMoney} onConfirm={onConfirm} onHide={onHide} />
    </View>
  )
})

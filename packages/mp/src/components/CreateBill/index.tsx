import { FC, useState, memo } from 'react'
import { View, Image } from '@fower/taro'
import { Keyboard } from './Keyboard'
import { Tabs, Grid, Toast } from '@taroify/core'
import { useQuery } from '@/common/request'
import { apiService } from '@/service/apiService'
import { TallyBook } from '@tally-book/types'
import { ApiName } from '@tally-book/model'
import Taro from '@tarojs/taro'
import { popUpService } from '@/service/layer'
import { LayerKey } from '@/common/constants'

interface CreateBillProps {}

export const CreateBill: FC<CreateBillProps> = memo(({}) => {
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
    popUpService.close(LayerKey.createBill)
    setMoney('')
  }

  async function onConfirm() {
    if (!money) return Toast.open('请输入金额')

    const res = await apiService.createBill({
      typeId: result[tab].grid[selected].id,
      money: Number.parseInt(money),
      time: '' + Date.now(),
    })

    if (res.success) {
      await useQuery.get(ApiName.GetBills).toFetch()
      await useQuery.get(ApiName.GetAssets).toFetch()
    }
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

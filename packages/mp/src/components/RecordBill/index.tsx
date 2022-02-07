import { FC, useState, memo } from 'react'
import { View } from '@fower/taro'
import { Keyboard } from './Keyboard'
import { Tabs, Grid } from '@taroify/core'
import { PhotoOutlined } from '@taroify/icons'
import { useQuery } from '@/common/request'
import { apiService } from '@/service/apiService'
import { TallyBook } from '@tally-book/types'

interface RecordBillProps { }

export const RecordBill: FC<RecordBillProps> = memo(({ }) => {
  const { response } = useQuery<TallyBook.billTypes[]>('/billTypes')
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(0)
  const [money, setMoney] = useState('')
  const result = response?.result || []

  function onTanChange(e) {
    setTab(e)
    setSelected(0)
  }

  async function onConfirm() {
    const { id } = result[tab].grid[selected]
    const res = await apiService.createBill({ typeId: id, money: Number.parseInt(money) })
    console.log('---', res)
  }

  return (
    <View className="record-bill" minH-500 maxH-700 overflowScroll relative pb-500>
      <Tabs value={tab} onChange={onTanChange}>
        {result.map((option) => {
          const { value, grid, type } = option
          const key = `${type}-${value}`

          return (
            <Tabs.TabPane key={key} title={value} style={{ padding: '10px' }}>
              <Grid columns={4} square>
                {grid.map((i, idx) => {
                  const { text } = i
                  const active = selected === idx

                  return (
                    <Grid.Item
                      key={i.id}
                      icon={<PhotoOutlined />}
                      text={text}
                      style={{ color: active ? 'yellow' : 'red' }}
                      onClick={() => setSelected(idx)}
                    />
                  )
                })}
              </Grid>
            </Tabs.TabPane>
          )
        })}
      </Tabs>
      <Keyboard value={money} onChange={setMoney} onConfirm={onConfirm} />
    </View>
  )
})

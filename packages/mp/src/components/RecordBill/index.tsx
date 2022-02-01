import { FC, useState, memo } from 'react'
import { View } from '@fower/taro'
import { Keyboard } from './Keyboard'
import { Tabs, Grid } from '@taroify/core'
import { PhotoOutlined } from '@taroify/icons'
import { useQuery } from '@/common/request'

interface RecordBillProps {}

export const RecordBill: FC<RecordBillProps> = memo(({}) => {
  const { data } = useQuery<any>({ path: '/recordTypes' })
  const { result = [] } = data || {}
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(0)

  function onTanChange(e) {
    setTab(e)
    setSelected(0)
  }

  return (
    <View className="record-bill" minH-500 maxH-700 overflowScroll relative pb-500>
      <Tabs value={tab} onChange={onTanChange}>
        {result.map((option) => {
          const { text, grid } = option
          return (
            <Tabs.TabPane key={text} title={text} style={{ padding: '10px' }}>
              <Grid columns={4} square>
                {grid.map((i, idx) => {
                  const { text } = i
                  const active = selected === idx
                  return (
                    <Grid.Item
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
      <Keyboard />
    </View>
  )
})

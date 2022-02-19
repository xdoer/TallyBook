import Taro from '@tarojs/taro'
import { FC, useEffect, useState } from 'react'
import { Image, View } from '@fower/taro'
import { Tabs, Grid, Form } from '@taroify/core'
import { AddOutlined } from '@taroify/icons'
import { useQuery } from '@/common/request'
import { TallyBook } from '@tally-book/types'
import { ApiName, BillType } from '@tally-book/model'
import { BillMainTypeMap } from '@/common/constants'
import { noop } from '@/common/request/use-request/utils'

interface ChooseBillTypeProps {
  value?: BillType
  onChange?(i: BillType): void
}

const ChooseBillType: FC<ChooseBillTypeProps> = ({ value = {}, onChange = noop }) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBillTypes.Res[]>>(
    ApiName.GetBillTypes,
  )
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (response?.success) {
      onChange(response.result[0].grid[0])
    }
  }, [response])

  function onTabChange(i) {
    setIdx(i)
    onChange(response.result[i].grid[0])
  }

  return (
    <View flex={1}>
      <Tabs value={idx} onChange={onTabChange}>
        {response?.result.map((option) => {
          const { grid, type } = option
          const _value = BillMainTypeMap[type]

          return (
            <Tabs.TabPane key={type} title={_value} style={{ padding: '10px' }}>
              <Grid columns={5} square bordered={false}>
                {grid.map((i) => {
                  const { text, icon } = i
                  const active = i.id === value.id

                  return (
                    <Grid.Item
                      key={i.id}
                      icon={<Image src={icon} circle-50 />}
                      text={text}
                      style={{ border: `1px solid ${active ? 'red' : 'transparent'}` }}
                      onClick={() => onChange(i)}
                    />
                  )
                })}
                <Grid.Item icon={<AddOutlined />} />
              </Grid>
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </View>
  )
}

export const BillTypeFiled = () => {
  return (
    <Form.Item name="billType">
      <Form.Control>
        {(controller) => <ChooseBillType value={controller.value} onChange={controller.onChange} />}
      </Form.Control>
    </Form.Item>
  )
}

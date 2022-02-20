import Taro from '@tarojs/taro'
import { FC } from 'react'
import { Image, View } from '@fower/taro'
import { Grid, Form } from '@taroify/core'
import { AddOutlined } from '@taroify/icons'
import { TallyBook } from '@tally-book/types'

interface BillTypeFiledProps {
  data: TallyBook.GetBillTypes.Res
}

export const BillTypeFiled: FC<BillTypeFiledProps> = ({ data }) => {
  const { grid = [] } = data || {}

  return (
    <Form.Item name="billType">
      <Form.Control>
        {(controller) => {
          return (
            <View flex={1}>
              <Grid columns={5} square bordered={false}>
                {grid.map((i) => {
                  const { text, icon } = i
                  const active = i.id === controller.value?.id

                  return (
                    <Grid.Item
                      key={i.id}
                      icon={<Image src={icon} circle-50 />}
                      text={text}
                      style={{ border: `1px solid ${active ? 'red' : 'transparent'}` }}
                      onClick={() => controller.onChange?.(i)}
                    />
                  )
                })}
                <Grid.Item icon={<AddOutlined />} />
              </Grid>
            </View>
          )
        }}
      </Form.Control>
    </Form.Item>
  )
}

import Taro from '@tarojs/taro'
import { FC } from 'react'
import { View } from '@fower/taro'
import { Grid, Form } from '@taroify/core'
import {
  LocationOutlined,
  LikeOutlined,
  StarOutlined,
  PhoneOutlined,
  SettingOutlined,
  FireOutlined,
  CouponOutlined,
  CartOutlined,
  CartCircleOutlined,
  CommentOutlined,
  GiftOutlined,
  ServiceOutlined,
  ClockOutlined,
  QuestionOutlined,
  PlayCircleOutlined,
  StopCircleOutlined,
  WarningOutlined,
  ShopCollectOutlined,
  VipCardOutlined,
  VolumeOutlined,
  ClusterOutlined,
  GoodJobOutlined,
  BillOutlined,
  NewArrivalOutlined,
  DeleteOutlined,
} from '@taroify/icons'
import { TallyBook } from '@tally-book/types'

const icons = [
  LocationOutlined,
  LikeOutlined,
  StarOutlined,
  PhoneOutlined,
  SettingOutlined,
  FireOutlined,
  CouponOutlined,
  CartOutlined,
  CartCircleOutlined,
  CommentOutlined,
  GiftOutlined,
  ServiceOutlined,
  ClockOutlined,
  QuestionOutlined,
  PlayCircleOutlined,
  StopCircleOutlined,
  WarningOutlined,
  ShopCollectOutlined,
  VipCardOutlined,
  VolumeOutlined,
  ClusterOutlined,
  GoodJobOutlined,
  BillOutlined,
  NewArrivalOutlined,
  DeleteOutlined,
]

interface BillTypeFiledProps {
  data: TallyBook.GetBillTypes.Res
}

export const BillTypeFiled: FC<BillTypeFiledProps> = ({ data }) => {
  const { grid = [] } = data || {}

  return (
    <Form.Item name="billType" rules={[{ validator: (val) => !!val, message: '请选择类型' }]}>
      <Form.Control>
        {(controller) => {
          return (
            <View flex={1}>
              <Grid columns={4} square>
                {grid.map((i, idx) => {
                  const { text } = i
                  const active = i.id === controller.value?.id

                  const Icon = icons[idx]

                  return (
                    <Grid.Item
                      key={i.id}
                      text={text}
                      icon={<Icon style={{ color: active ? '#ee0a24' : 'inherit' }} />}
                      onClick={() => controller.onChange?.(i)}
                    />
                  )
                })}
              </Grid>
            </View>
          )
        }}
      </Form.Control>
    </Form.Item>
  )
}

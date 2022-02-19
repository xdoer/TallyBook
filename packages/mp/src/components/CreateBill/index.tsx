import Taro from '@tarojs/taro'
import { View } from '@fower/taro'
import { FC, memo } from 'react'
import { Form, Button } from '@taroify/core'
import { BillTypeFiled, CalendarField } from './FormItem'

interface CreateBillProps {}

export const CreateBill: FC<CreateBillProps> = memo(({}) => {
  async function onSubmit(e) {
    console.log(e.detail.value)

    // if (!money) return Toast.open('请输入金额')

    // const res = await apiService.createBill({
    //   typeId: result[tab].grid[selected].id,
    //   money: Number.parseInt(money),
    //   time: '' + Date.now(),
    // })

    // if (res.success) {
    //   await useQuery.get(ApiName.GetBills).toFetch()
    //   await useQuery.get(ApiName.GetAssets).toFetch()
    // }
  }

  return (
    <View className="record-bill" minH-500 maxH-700 overflowScroll relative pb-500>
      <Form onSubmit={onSubmit}>
        <BillTypeFiled />
        <CalendarField />
        <View style={{ margin: '16px' }}>
          <Button shape="round" block color="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
})

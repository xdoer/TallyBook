import Taro from '@tarojs/taro'
import { FC, useState, memo } from 'react'
import { View } from '@fower/taro'
import { Tabs } from '@taroify/core'
import { useQuery } from '@/common/request'
import { TallyBook } from '@tally-book/types'
import { ApiName } from '@tally-book/model'
import { BillMainTypeMap } from '@/common/constants'
import { BillForm } from './Form'

interface CreateBillProps {
  id?: string
}

export const CreateBill: FC<CreateBillProps> = memo(({ id }) => {
  const { response } = useQuery<TallyBook.Response<TallyBook.GetBillTypes.Res[]>>(
    ApiName.GetBillTypes,
  )
  const [idx, setIdx] = useState(0)

  return (
    <View className="record-bill" minH-500 maxH-700 overflowScroll relative pb-500>
      <Tabs value={idx} onChange={setIdx}>
        {response?.result.map((option, idx) => {
          const _value = BillMainTypeMap[option.type]
          return (
            <Tabs.TabPane key={option.type} title={_value} style={{ padding: '10px' }}>
              <BillForm id={id} idx={idx} data={option} onTabChange={setIdx} />
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </View>
  )
})

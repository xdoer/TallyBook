import React, { FC, useState } from 'react'
import { View } from '@fower/taro'
import { popUpService } from '@/service/layer'
import { YearMonthPicker } from '@/components/YearMonthPicker'
import { formatDate } from '@/common/utils'
import { Arrow } from '@taroify/icons'

interface DatePickerProps {}

export const DatePicker: FC<DatePickerProps> = ({}) => {
  const [date, setDate] = useState(new Date())

  function chooseDate() {
    popUpService.open(<YearMonthPicker value={date} onConfirm={setDate} />)
  }

  return (
    <View py-20 onClick={() => chooseDate()} toCenterY>
      <View fontBold mr-10 text3XL>
        {formatDate(date, 'yyyy年MM月')}
      </View>
      <Arrow />
    </View>
  )
}

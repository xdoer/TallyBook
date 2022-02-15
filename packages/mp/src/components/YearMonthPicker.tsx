import { FC, useState } from 'react'
import { DatetimePicker } from '@taroify/core'
import { popUpService } from '@/service/layer'
import { LayerKey } from '@/common/constants'

interface YearMonthPickerProps {
  value: Date
  onConfirm(value: Date): void
}

export const YearMonthPicker: FC<YearMonthPickerProps> = ({ value, onConfirm }) => {
  const [minDate] = useState(new Date(2020, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [defaultValue] = useState(new Date(2021, 0, 17))

  return (
    <DatetimePicker
      type="year-month"
      min={minDate}
      max={maxDate}
      value={value}
      defaultValue={defaultValue}
      formatter={(type, val) => {
        if (type === 'year') {
          return `${val}年`
        }
        if (type === 'month') {
          return `${val}月`
        }
        return val
      }}
      onCancel={() => popUpService.close(LayerKey.datePicker)}
      onConfirm={(date) => {
        onConfirm(date)
        popUpService.close(LayerKey.datePicker)
      }}
    >
      <DatetimePicker.Toolbar>
        <DatetimePicker.Button>取消</DatetimePicker.Button>
        <DatetimePicker.Title>选择年月</DatetimePicker.Title>
        <DatetimePicker.Button>确认</DatetimePicker.Button>
      </DatetimePicker.Toolbar>
    </DatetimePicker>
  )
}

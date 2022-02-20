import { FC, useRef } from 'react'
import { Calendar, Input, Form } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { FormItemInstance } from '@taroify/core/form'
import { formatDate } from '@/common/utils'
import { layerService } from '@/service/layerService'

export const TimeField: FC = ({}) => {
  const itemRef = useRef<FormItemInstance>()
  const { open, close } = layerService.getUnit()

  return (
    <Form.Item ref={itemRef} name="time" clickable rightIcon={<ArrowRight />}>
      <Form.Label>日期</Form.Label>
      <Form.Control>
        {(controller) => {
          const value = controller.value
            ? formatDate(new Date(controller.value))
            : formatDate(new Date())
          return (
            <Input
              value={value}
              readonly
              placeholder="点击选择日期"
              onClick={() => {
                const min = new Date()
                min.setMonth(min.getMonth() - 1)
                const max = new Date()
                open({
                  style: { height: '80%' },
                  content: (
                    <Calendar
                      type="single"
                      min={min}
                      max={max}
                      defaultValue={max}
                      onConfirm={(newValue) => {
                        itemRef.current?.setValue(new Date(newValue).getTime())
                        close()
                      }}
                    >
                      <Calendar.Footer>
                        <Calendar.Button type="confirm">确定</Calendar.Button>
                      </Calendar.Footer>
                    </Calendar>
                  ),
                })
              }}
            />
          )
        }}
      </Form.Control>
    </Form.Item>
  )
}

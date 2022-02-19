import { useRef } from 'react'
import { Calendar, Input, Form } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { FormItemInstance } from '@taroify/core/form'
import { formatDate } from '@/common/utils'
import { layerService } from '@/service/layerService'
import { LayerKey } from '@/common/constants'

export const CalendarField = () => {
  const itemRef = useRef<FormItemInstance>()

  return (
    <Form.Item ref={itemRef} name="calendar" clickable rightIcon={<ArrowRight />}>
      <Form.Label>日历</Form.Label>
      <Form.Control>
        {(controller) => {
          const value = controller.value ? formatDate(new Date(controller.value)) : undefined
          return (
            <Input
              value={value}
              readonly
              placeholder="点击选择日期"
              onClick={() => {
                const x = new Date()
                x.setMonth(x.getMonth() - 1)

                layerService.open(
                  {
                    style: { height: '80%' },
                    content: (
                      <Calendar
                        type="single"
                        min={x}
                        max={new Date()}
                        onConfirm={(newValue) => {
                          itemRef.current?.setValue(new Date(newValue).getTime())
                          layerService.close(LayerKey.chooseDate)
                        }}
                      >
                        <Calendar.Footer>
                          <Calendar.Button type="confirm">确定</Calendar.Button>
                        </Calendar.Footer>
                      </Calendar>
                    ),
                  },
                  LayerKey.chooseDate,
                )
              }}
            />
          )
        }}
      </Form.Control>
    </Form.Item>
  )
}

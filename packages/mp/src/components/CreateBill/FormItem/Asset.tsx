import React, { FC, useEffect, useRef } from 'react'
import { Form, Input, Picker } from '@taroify/core'
import { layerService } from '@/service/layerService'
import { FormItemInstance } from '@taroify/core/form'
import { ArrowRight } from '@taroify/icons'
import { loginStore } from '@/store'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'
import { TallyBook } from '@tally-book/types'

interface AssetFiledProps {}

export const AssetFiled: FC<AssetFiledProps> = ({}) => {
  const { response } = useQuery<TallyBook.GetAssets.Res>(ApiName.GetAssets)
  const itemRef = useRef<FormItemInstance>()
  const { open, close } = layerService.getUnit()
  const defaultAsset = loginStore.getState().asset

  useEffect(() => {
    // 登录后才会请求接口渲染页面
    // 所以这里 loginStore.getState() 一定存在值
    itemRef.current?.setValue(defaultAsset)
  }, [])

  return (
    <Form.Item
      ref={itemRef}
      clickable
      rightIcon={<ArrowRight />}
      name="asset"
      rules={[{ required: true, message: '请选择资产' }]}
    >
      <Form.Label>资产</Form.Label>
      <Form.Control>
        {(controller) => {
          const value = controller.value?.name

          return (
            <Input
              value={value}
              readonly
              placeholder="点击选择资产"
              onClick={() => {
                open({
                  content: (
                    <Picker
                      defaultValue={defaultAsset}
                      onCancel={() => close()}
                      onConfirm={(newValue) => {
                        itemRef.current?.setValue(newValue[0])
                        close()
                      }}
                    >
                      <Picker.Toolbar>
                        <Picker.Button>取消</Picker.Button>
                        <Picker.Button>确认</Picker.Button>
                      </Picker.Toolbar>
                      <Picker.Column>
                        {response?.result.map((i) => {
                          const { name } = i
                          return (
                            <Picker.Option key={name} value={i}>
                              {name}
                            </Picker.Option>
                          )
                        })}
                      </Picker.Column>
                    </Picker>
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

import { FC, useState } from 'react'
import { NumberKeyboard } from '@taroify/core'
import { View } from '@fower/taro'
import { popUpService } from '../PopupContainer'

interface KeyboardProps {}

export const Keyboard: FC<KeyboardProps> = ({}) => {
  const [value, setValue] = useState('')

  function onKeyPress(key, type) {
    if (type === 'extra') {
      setValue(value + key)
    }
  }

  function onBackspace() {
    setValue(value.slice(0, -1))
  }

  const Title = (
    <View flexAuto>
      <View fontBold text6XL>
        {value}
      </View>
    </View>
  )

  return (
    <NumberKeyboard
      open
      extraKey={[undefined, '.']}
      onKeyPress={onKeyPress}
      title={Title}
      onBackspace={onBackspace}
      onHide={() => {
        popUpService.close()
      }}
    >
      <NumberKeyboard.Sidebar>
        <NumberKeyboard.Key size="large" code="backspace" />
        <NumberKeyboard.Key size="large" code="keyboard-hide" color="blue">
          完成
        </NumberKeyboard.Key>
      </NumberKeyboard.Sidebar>
    </NumberKeyboard>
  )
}

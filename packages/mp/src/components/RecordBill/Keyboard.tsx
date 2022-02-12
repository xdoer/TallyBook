import { FC } from 'react'
import { NumberKeyboard } from '@taroify/core'
import { View } from '@fower/taro'
import { popUpService } from '@/service/layer'

interface KeyboardProps {
  value: string
  onChange: (v: string) => void
  onConfirm: () => void
}

export const Keyboard: FC<KeyboardProps> = ({ value, onChange, onConfirm }) => {
  function onKeyPress(key, type) {
    if (type === 'extra') {
      onChange(value + key)
    }
  }

  function onBackspace() {
    onChange(value.slice(0, -1))
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
        <NumberKeyboard.Key size="large" code="keyboard-hide" color="blue" onPress={onConfirm}>
          完成
        </NumberKeyboard.Key>
      </NumberKeyboard.Sidebar>
    </NumberKeyboard>
  )
}

import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default function () {
  const [context, setContext] = useState<any>()

  function getLogin() {
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {},
      })
      .then((res) => {
        setContext(res.result)
      })
  }

  return (
    <View className="index">
      <Button onClick={getLogin}>获取登录云函数</Button>
      <Text>context：{JSON.stringify(context)}</Text>
    </View>
  )
}

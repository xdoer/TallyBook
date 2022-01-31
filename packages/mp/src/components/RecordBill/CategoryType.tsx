import React, { FC, useState } from 'react'
import { View } from '@fower/taro'
import { Tabs, TabOption } from '@/components/Tabs'

interface CategoryTabProps { }

export const CategoryTab: FC<CategoryTabProps> = ({ }) => {
  const [active, setActive] = useState(0)

  return (
    <View toCenter text2XL>
      <Tabs w-80p options={options} value={active} onChange={setActive} />
    </View>
  )
}

const options: TabOption[] = [
  {
    text: '支出'
  },
  {
    text: '收入'
  },
  {
    text: '转账'
  }
]

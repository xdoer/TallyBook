import { FC, useEffect, useState } from 'react'
import { View, Image } from '@fower/taro'
import { Tabs } from '@/components/Tabs'
import { useQuery } from '@/common/request'
import { ApiName } from '@tally-book/model'

interface TopBarProps {}

const d = new Date()
const year = d.getFullYear()
const month = d.getMonth()

export const TopBar: FC<TopBarProps> = ({}) => {
  const [dimension, setDimension] = useState(1)
  const [time, setTime] = useState({ year, month: undefined })

  useEffect(() => {
    useQuery.get(ApiName.Statistics).toFetch(() => {
      return {
        params: {
          time,
        },
      }
    })
  }, [time])

  function chooseDimension(idx) {
    setDimension(idx)
    // @ts-ignore
    setTime({ year, month: !idx ? month : undefined })
  }

  function onChange(dir) {
    // @ts-ignore
    const d = new Date(time.year, time.month)

    if (dimension === 0) {
      const month = time.month || d.getMonth()
      d.setMonth(dir === 'sub' ? month - 1 : month + 1)
    }

    if (dimension === 1) {
      d.setFullYear(dir === 'sub' ? time.year - 1 : time.year + 1)
    }

    // @ts-ignore
    setTime({ year: d.getFullYear(), month: dimension === 0 ? d.getMonth() : undefined })
  }

  return (
    <View>
      <View toBetween text="12px" color="#333">
        <Tabs
          options={[{ text: '月' }, { text: '年' }]}
          flex-10
          value={dimension}
          onChange={chooseDimension}
        />
      </View>
      <View toBetween toCenterY mt-20>
        <View className="iconfont icon-arrow-left-circle" onClick={() => onChange('sub')}></View>
        <View text2XL gray600>
          {time.year}年{time.month ? time.month + '月' : ''}
        </View>
        <View className="iconfont icon-arrow-right-circle" onClick={() => onChange('plus')}></View>
      </View>
    </View>
  )
}

interface Item {
  text: string
  active: boolean
  icon?: string
  onClick(): void
}

const Item: FC<Item> = ({ active, text, icon, onClick }) => {
  return (
    <View
      onClick={onClick}
      bgGray500={active}
      white={active}
      rounded-10={active}
      flexAuto
      toCenter
      py-10
    >
      {icon && <Image src={icon} />}
      <View>{text}</View>
    </View>
  )
}

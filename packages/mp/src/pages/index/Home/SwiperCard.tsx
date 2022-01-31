import React, { FC } from 'react'
import { Swiper, SwiperItem } from '@fower/taro'
import { Card } from '@/components/Card'
import { ReportCard } from '@/components/ReportCard'

interface SwiperCardProps { }

export const SwiperCard: FC<SwiperCardProps> = ({ }) => {
  return (
    <Card>
      <Swiper indicatorDots indicatorActiveColor="#FCD423" indicatorColor="#F0F0F0" h-250>
        {
          list.map(item => {
            return (
              <SwiperItem>
                <ReportCard report={item} />
              </SwiperItem>
            )
          })
        }
      </Swiper>
    </Card>
  )
}

const list = [
  {
    title: '总支出',
    money: 1000,
  },
  {
    title: '剩余预算',
    money: 1000,
  },
  {
    title: '待报销',
    money: 1000,
  }
]
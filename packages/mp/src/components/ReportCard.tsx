import React, { FC } from 'react'
import { View } from '@fower/taro'

interface ReportCardProps {
  report: any
}

export const ReportCard: FC<ReportCardProps> = ({ report }) => {
  const { title, money } = report

  return (
    <View p-15>
      <View brandPrimary>{title}</View>
      <View text6XL fontBold my-10>
        ￥{money}
      </View>
      <View flex text2XL>
        <View flex mr-30>
          <View gray500 fontBold mr-5>
            总收入
          </View>
          <View gray400>{1000}</View>
        </View>
        <View flex>
          <View gray500 fontBold mr-5>
            结余
          </View>
          <View gray400>{1200}</View>
        </View>
      </View>
    </View>
  )
}

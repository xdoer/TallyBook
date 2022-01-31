import React, { FC } from 'react'
import { View } from '@fower/taro'
import { Card } from '@/components/Card'

interface OverviewProps { }

export const Overview: FC<OverviewProps> = ({ }) => {
  return (
    <View>
      <View py-20 toCenterY>
        <View fontBold text3XL>总览</View>
      </View>
      <View mb-20>
        <Card>
          <View p-15>
            <View brandPrimary>收支记录</View>
            <View row toBetween mt-20>
              <View>
                <View gray400 text2XL>支出</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>收入</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>结余</View>
                <View gray500 text4XL>255255</View>
              </View>
            </View>
          </View>
        </Card>
      </View>
      <View mb-20>
        <Card>
          <View p-15>
            <View brandPrimary>收支记录</View>
            <View row toBetween mt-20>
              <View>
                <View gray400 text2XL>支出</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>收入</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>结余</View>
                <View gray500 text4XL>255255</View>
              </View>
            </View>
          </View>
        </Card>
      </View>
      <View mb-20>
        <Card>
          <View p-15>
            <View brandPrimary>收支记录</View>
            <View row toBetween mt-20>
              <View>
                <View gray400 text2XL>支出</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>收入</View>
                <View gray500 text4XL>255255</View>
              </View>
              <View>
                <View gray400 text2XL>结余</View>
                <View gray500 text4XL>255255</View>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}

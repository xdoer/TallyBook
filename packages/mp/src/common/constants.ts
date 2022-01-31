export const TabBarPageTitleList = ['资产', '账本', '统计']

const env = process.env.TARO_ENV

export const PLATFORM = {
  isWxCloud: false,
  isLocal: env === 'local',
  isServer: true
  // isWxCloud: env === 'weapp',
  // isLocal: env === 'local',
  // isServer: env === 'server'
}

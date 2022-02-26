declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'local' | 'alipay' | 'server'
    [key: string]: any
  }
  cwd: () => string
  kill: any
}

declare module '@fower/atomic-props' {
  interface AtomicProps {
    bgBrandLight?: boolean
    bgBrandLighter?: boolean
    bgBrandLightest?: boolean
    bgBrandPrimary?: boolean
    bgBrandDark?: boolean
    bgBrandDarker?: boolean
    bgBrandDarkest?: boolean

    brandLight?: boolean
    brandLighter?: boolean
    brandLightest?: boolean
    brandPrimary?: boolean
    brandDark?: boolean
    brandDarker?: boolean
    brandDarkest?: boolean
  }
}

declare module '@prequest/types' {
  interface PreQuestRequest {
    skipTokenCheck?: boolean
  }

  interface PreQuestResponse<T> {
    success: boolean
    result: T
    error: {
      code: string
      message: string
    }
  }
}

import { memo } from 'react'
import { Toast } from '@taroify/core'
import { LayerContainer } from './LayerContainer'

export default memo(({}) => {
  return (
    <>
      <LayerContainer />
      <Toast id="toast" />
    </>
  )
})

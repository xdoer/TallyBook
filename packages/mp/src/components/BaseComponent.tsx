import { memo } from 'react'
import { Toast } from '@taroify/core'
import { ModalContainer } from './ModalContainer'
import { PopupContainer } from './PopupContainer'

export default memo(({}) => {
  return (
    <>
      <ModalContainer />
      <PopupContainer />
      <Toast id="toast" />
    </>
  )
})

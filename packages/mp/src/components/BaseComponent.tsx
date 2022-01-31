import { memo } from "react"
import { ModalContainer } from "./ModalContainer"
import { PopupContainer } from "./PopupContainer"

export default memo(({ }) => {
  return (
    <>
      <ModalContainer />
      <PopupContainer />
    </>
  )
})

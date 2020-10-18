import React from 'react'
import Backdrop from '../UI/Backdrop/Backdrop'
import MobileNavigation from './MobileNavigation/MobileNavigation'

type TProps = {
  toggleMenu: () => void
}
export default function MenuMobile({ toggleMenu }: TProps) {
  return (
    <Backdrop onClick={toggleMenu}>
      <MobileNavigation toggleMenu={toggleMenu} />
    </Backdrop>
  )
}

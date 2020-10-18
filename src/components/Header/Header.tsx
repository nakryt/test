import React from 'react'
import './Header.scss'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Navigation from './Navigation/Navigation'
import { ReactComponent as MenuIcon } from '../../assets/menu-icon.svg'

type TProps = {
  toggleMobileMenu: () => void
}
export default function Header({ toggleMobileMenu }: TProps) {
  return (
    <header className="container header">
      <Logo />
      <Navigation />
      <MenuIcon className="menu-icon" onClick={toggleMobileMenu} />
    </header>
  )
}

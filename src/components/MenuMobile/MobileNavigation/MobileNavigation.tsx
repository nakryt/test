import React from 'react'
import './MobileNavigation.scss'
import { useLocation, NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/logo.svg'

const links = [
  { id: 1, href: '#about', title: 'About me' },
  { id: 2, href: '/relationships', title: 'Relationships' },
  { id: 3, href: '#users', title: 'Users' },
  { id: 4, href: '#registration', title: 'Sign Up' },
  { id: 5, href: '/terms-and-conditions', title: 'Terms and Conditions' },
  { id: 6, href: '/how-it-works', title: 'How it works' },
  { id: 7, href: '/partnership', title: 'Partnership' },
  { id: 8, href: '/help', title: 'Help' },
  { id: 9, href: '/leave-testimonial', title: 'Leave testimonial' },
  { id: 10, href: '/contact', title: 'Contact us' },
  { id: 11, href: '/articles', title: 'Articles' },
  { id: 12, href: '/our-news', title: 'Our news' },
  { id: 13, href: '/testimonials', title: 'Testimonials' },
  { id: 14, href: '/licenses', title: 'Licenses' },
  { id: 15, href: '/privacy-policy', title: 'Privacy Policy' },
]

type TProps = {
  toggleMenu: () => void
}

export default function MobileNavigation({ toggleMenu }: TProps) {
  const { hash } = useLocation()

  return (
    <nav className="mobile-navigation">
      <div className="container logo-wrapper">
        <Logo />
      </div>
      <ul>
        {links.map(({ id, href, title }) => (
          <li className="container navigation__item" key={id}>
            {href[0] === '#' ? (
              <a
                href={href}
                className={hash === href ? 'active-link' : ''}
                onClick={toggleMenu}
              >
                {title}
              </a>
            ) : (
              <NavLink
                to={href}
                activeClassName="active-link"
                onClick={toggleMenu}
              >
                {title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

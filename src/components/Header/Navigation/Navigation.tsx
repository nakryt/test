import React from 'react'
import './Navigation.scss'
import { useLocation } from 'react-router-dom'

const links = [
  { id: 1, href: '#about', title: 'About me' },
  { id: 2, href: '#relationships', title: 'Relationships' },
  { id: 3, href: '#requirements', title: 'Requirements' },
  { id: 4, href: '#users', title: 'Users' },
  { id: 5, href: '#registration', title: 'Sing up' },
]

export default function Navigation() {
  const { hash } = useLocation()

  return (
    <nav className="navigation">
      <ul>
        {links.map(({ id, href, title }) => (
          <li className="navigation__item" key={id}>
            <a href={href} className={hash === href ? 'active-link' : ''}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

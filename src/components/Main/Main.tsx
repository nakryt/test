import React from 'react'
import AboutMe from './AboutMe/AboutMe'
import Banner from './Banner/Banner'
import RegisterForm from './RegisterForm/RegisterForm'
import Users from './Users/Users'

export default function Main() {
  return (
    <main>
      <Banner />
      <AboutMe />
      <Users />
      <RegisterForm />
    </main>
  )
}

import React from 'react'
import Button from '../../UI/Button/Button'
import './Banner.scss'

export default function Banner() {
  return (
    <section className="container banner">
      <h1 className="title">Test assignment for Frontend Developer position</h1>
      <p className="description">
        We kindly remind you that your test assignment should be submitted as a
        link to github/bitbucket repository.&nbsp;
        <span className="description--laptop-up">
          Please be patient, we consider and respond to every application that
          meets minimum requirements. We look forward to your submission. Good
          luck! The photo has to scale in the banner area on the different
          screens
        </span>
      </p>
      <Button title="Sign up now" link href="#registration" />
    </section>
  )
}

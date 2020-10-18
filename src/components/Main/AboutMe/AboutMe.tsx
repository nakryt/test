import React from 'react'
import './AboutMe.scss'

import { ReactComponent as ManWithLaptop } from '../../../assets/man-laptop-v1.svg'
import Button from '../../UI/Button/Button'

export default function AboutMe() {
  return (
    <section id="about" className="container about">
      <h3 className="title">Let's get acquainted</h3>
      <div className="description__wrapper">
        <ManWithLaptop />
        <div className="description">
          <h6 className="description__title">I am cool frontend developer</h6>
          <p className="description__text">
            We will evaluate how clean your approach to writing CSS and
            Javascript code is. You can use any CSS and Javascript 3rd party
            libraries without any restriction.
          </p>
          <p className="description__text">
            If 3rd party css/javascript libraries are added to the project via
            bower/npm/yarn you will get bonus points. If you use any task runner
            (gulp/webpack) you will get bonus points as well. Slice service
            directory page P​SD mockup​ into HTML5/CSS3.{' '}
          </p>
          <Button
            title="Sign up now"
            link
            href="#registration"
            style={{ backgroundColor: '#fff' }}
          />
        </div>
      </div>
    </section>
  )
}

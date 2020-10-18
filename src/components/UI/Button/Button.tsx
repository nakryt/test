import React from 'react'
import './Button.scss'

type Props = {
  title: string
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  link?: boolean
  href?: string
  style?: Object
  props?: Object
  onClick?: () => void
}
const Button: React.FC<Props> = ({
  title,
  type = 'button',
  disabled = false,
  link = false,
  href = '',
  style = {},
  onClick,
  props,
}) => {
  if (link)
    return (
      <a
        href={href}
        className='button'
        style={style}
        onClick={onClick}
        {...props}
      >
        {title}
      </a>
    )
  return (
    <button
      className='button'
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  )
}

export default Button

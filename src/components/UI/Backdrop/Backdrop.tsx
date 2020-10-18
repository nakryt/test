import React from 'react'
import './Backdrop.scss'

type TProps = {
  onClick?: () => void
}

const Backdrop: React.FC<TProps> = ({ children, onClick }) => {
  return (
    <div className='backdrop' onClick={onClick}>
      {children}
    </div>
  )
}

export default Backdrop

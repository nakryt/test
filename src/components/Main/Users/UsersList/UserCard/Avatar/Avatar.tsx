import React from 'react'
import './Avatar.scss'
import { ReactComponent as DefaultAvatar } from '../../../../../../assets/photo-cover.svg'

type Props = {
  photo: string
}

export default function Avatar({ photo }: Props) {
  return (
    <>
      {photo.length ? (
        <img className="photo" src={photo} alt="" />
      ) : (
        <DefaultAvatar />
      )}
    </>
  )
}

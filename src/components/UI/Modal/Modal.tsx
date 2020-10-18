import React from 'react'
import './Modal.scss'

import ModalBootstrap from 'react-bootstrap/Modal'
import Button from '../Button/Button'

type TProps = {
  show?: boolean
  onHide?: () => void
}
export default function Modal({ show, onHide }: TProps) {
  return (
    <ModalBootstrap
      centered
      show={show}
      onHide={onHide}
      // dialogClassName='modal'
    >
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title>Congratulations</ModalBootstrap.Title>
      </ModalBootstrap.Header>

      <ModalBootstrap.Body>
        <p>You have successfully passed the&nbsp;registration</p>
      </ModalBootstrap.Body>

      <ModalBootstrap.Footer>
        <Button title='Great' onClick={onHide} />
      </ModalBootstrap.Footer>
    </ModalBootstrap>
  )
}

import React from 'react'
import { Toast } from 'react-bootstrap'
import logo from "../../assets/img/quotes.png";

function Notification({ variant, message, onCloseHandler }) {
  return (
    <div 
      style={{
        position: 'absolute',
        right: 30,
        top: 50,
        zIndex: 9999,
        width: 'min-content'
      }}
    >
    <Toast  onClose={onCloseHandler} className="d-inline-block m-1" bg={variant.toLowerCase()} position='top-end' delay={3000} autohide>
      <Toast.Header>
        <img src={logo} className="rounded me-2" alt="shayari app Logo" width={20} height={20}/>
        <strong className="me-auto">Shayari Dashboard</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body className={variant === 'dark' && 'text-white'}>
        {message}
      </Toast.Body>
      </Toast>
    </div>
  )
}

export default Notification
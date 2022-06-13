import React from 'react'
import { Card } from 'react-bootstrap'
import './ImageStatus.css'
import dummy from '../../assets/img/icon_dummy.png'

function StatusCard({statusimage, category}) {
  return (
    <Card className='form-card status-container' border="primary">
      <Card.Header className='d-flex justify-content-between'><span>Image Preview</span></Card.Header>
      <Card.Body className='d-flex justify-content-center align-items-center flex-column status-body'>
        <img src={statusimage ? typeof(statusimage) == 'string' ? statusimage : URL.createObjectURL(statusimage) : dummy} alt="Status" className="m-3"/>          
      </Card.Body>
      <Card.Footer>{category!=="" ? category : "Love Shayari"}</Card.Footer>
    </Card>
  )
}

export default StatusCard
import React from 'react'
import { Card } from 'react-bootstrap'
import dummy from '../../assets/img/icon_dummy.png'

function CategoryCard({fontColor, categoryFontSize, category, gradientSingleColor, gradientSecondColor, icon}) {
  return (
    <Card className='form-card' border="primary" style={{height: '250px'}}>
        <Card.Header className='d-flex justify-content-between'><span>Category Preview</span></Card.Header>
        <Card.Body className='d-flex justify-content-center align-items-center flex-column' style={{color: fontColor,backgroundImage:`linear-gradient(${gradientSingleColor},${gradientSecondColor})`}}>
          <img src={icon ? typeof(icon) == 'string' ? icon : URL.createObjectURL(icon) : dummy} alt="Category Icon" width={80} height={80} className="m-3"/>
          <span className="shayri-text pr-2 pl-2" style={{fontSize: categoryFontSize}}> {category==="" ? "Love" : category } </span>               
        </Card.Body>
        {typeof(icon) == 'string' ? <Card.Footer>Action</Card.Footer> : null}
      </Card>
  )
}

export default CategoryCard
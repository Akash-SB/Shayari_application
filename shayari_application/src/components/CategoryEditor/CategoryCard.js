import React from 'react'
import { Card } from 'react-bootstrap'

function CategoryCard({fontColor, categoryFontSize, category, gradientSingleColor, gradientSecondColor, icon}) {
  return (
    <Card className='form-card' border="primary" style={{height: '250px'}}>
        <Card.Header className='d-flex justify-content-between'><span>Shayri Preview</span></Card.Header>
        <Card.Body className='d-flex justify-content-center align-items-center flex-column' style={{color: fontColor,backgroundImage:`linear-gradient(${gradientSingleColor},${gradientSecondColor})`}}>
          <img src={icon ? URL.createObjectURL(icon) : null} alt="Category Icon" width={80} height={80} className="m-3"/>

          <span className="shayri-text pr-2 pl-2" style={{fontSize: categoryFontSize}}> {category==="" ? "Love" : category } </span>               
        </Card.Body>        
      </Card>
  )
}

export default CategoryCard
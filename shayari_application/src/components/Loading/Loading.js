import React from 'react'
import loadingImage from '../../assets/img/loading.gif'
import './Loading.css'

function Loading() {
  return (
      <div className='loading_container'>
          <img src={loadingImage} alt="Loading Animation" />
      </div>
  )
}

export default Loading
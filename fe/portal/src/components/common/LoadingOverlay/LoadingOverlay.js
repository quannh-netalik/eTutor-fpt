import React from 'react'
import { Spinner  } from 'react-bootstrap'

const LoadingOverlay = () => {

  return (
    <div className = "container-spiner">
      <div className = "container-spiner__icon">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingOverlay

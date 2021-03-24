import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const LoadingOverlay = () => {

  return (
    <div className="container-spiner">
      <div className="container-spiner__icon">
        <FontAwesomeIcon className='icon__disconnect' icon='unlink' />
        <p>You have been disconnected from server, please reload...</p>
      </div>
    </div>
  )
}

export default LoadingOverlay

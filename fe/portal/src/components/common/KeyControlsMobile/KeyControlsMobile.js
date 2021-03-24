import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const KeyControlsMobile = (props) => {
  const { vectorMove, booth  } = props
  const controlRef = useRef(null)
  const defaultRef = useRef(null)

  if (controlRef.current) {
    //button set default screen
    defaultRef.current.addEventListener('mousedown', function (event) {
      vectorMove('default')
      const repeatMove = setInterval(() => {
        vectorMove('default')
      }, 25)
      defaultRef.current.addEventListener('mouseleave', function (event) {
        clearInterval(repeatMove)
      })
      defaultRef.current.addEventListener('mouseup', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button set default screen
    defaultRef.current.addEventListener('touchstart', function (event) {
      vectorMove('default')
      const repeatMove = setInterval(() => {
        vectorMove('default')
      }, 25)
      defaultRef.current.addEventListener('touchend', function (event) {
        clearInterval(repeatMove)
      })
    })
  }
  return (
    <div ref={controlRef}>
      <div style={{top : `${booth === 'information'? 'calc(100% - 200px)' : 'calc(100% - 140px)'}`}} className="container-button-mobile-key" >
        <div className="container-button-mobile-key_center" ref={defaultRef}>
          <FontAwesomeIcon
            className='key__icon'
            icon='redo'
          />
        </div>
      </div>
    </div>
  )

}

export default KeyControlsMobile

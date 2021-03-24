import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const KeyControls = (props) => {
  const { vectorMove, hideZoom, hidePan, } = props
  const controlRef = useRef(null)
  const btLeftRef = useRef(null)
  const btRightRef = useRef(null)
  const zoomInRef = useRef(null)
  const zoomOutRef = useRef(null)
  const defaultRef = useRef(null)

  if (controlRef.current) {
    //button Left
    btLeftRef.current.addEventListener('mousedown', function (event) {
      vectorMove('left')
      const repeatMove = setInterval(() => {
        vectorMove('left')
      }, 25)
      btLeftRef.current.addEventListener('mouseleave', function (event) {
        clearInterval(repeatMove)
      })
      btLeftRef.current.addEventListener('mouseup', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Right
    btRightRef.current.addEventListener('mousedown', function (event) {
      vectorMove('right')
      const repeatMove = setInterval(() => {
        vectorMove('right')
      }, 25)
      btRightRef.current.addEventListener('mouseleave', function (event) {
        clearInterval(repeatMove)
      })
      btRightRef.current.addEventListener('mouseup', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Up
    zoomInRef.current.addEventListener('mousedown', function (event) {
      vectorMove('in')
      const repeatMove = setInterval(() => {
        vectorMove('in')
      }, 25)
      zoomInRef.current.addEventListener('mouseleave', function (event) {
        clearInterval(repeatMove)
      })
      zoomInRef.current.addEventListener('mouseup', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Down
    zoomOutRef.current.addEventListener('mousedown', function (event) {
      vectorMove('out')
      const repeatMove = setInterval(() => {
        vectorMove('out')
      }, 25)
      zoomOutRef.current.addEventListener('mouseleave', function (event) {
        clearInterval(repeatMove)
      })
      zoomOutRef.current.addEventListener('mouseup', function (event) {
        clearInterval(repeatMove)
      })
    })

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

    //touch
    //button Left
    btLeftRef.current.addEventListener('touchstart', function (event) {
      vectorMove('left')
      const repeatMove = setInterval(() => {
        vectorMove('left')
      }, 25)
      btLeftRef.current.addEventListener('touchend', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Right
    btRightRef.current.addEventListener('touchstart', function (event) {
      vectorMove('right')
      const repeatMove = setInterval(() => {
        vectorMove('right')
      }, 25)
      btRightRef.current.addEventListener('touchend', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Up
    zoomInRef.current.addEventListener('touchstart', function (event) {
      vectorMove('in')
      const repeatMove = setInterval(() => {
        vectorMove('in')
      }, 25)
      zoomInRef.current.addEventListener('touchend', function (event) {
        clearInterval(repeatMove)
      })
    })

    //button Down
    zoomOutRef.current.addEventListener('touchstart', function (event) {
      vectorMove('out')
      const repeatMove = setInterval(() => {
        vectorMove('out')
      }, 25)
      zoomOutRef.current.addEventListener('touchend', function (event) {
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
      <div className="container-button-key" >
        {
          hideZoom && hideZoom === 'in' ?
            <div className="container-button-key_up disabled" ref={zoomInRef}>
              <FontAwesomeIcon
                className='key__icon'
                icon='chevron-up'
              />
            </div>
            :
            <div className="container-button-key_up" ref={zoomInRef}>
              <FontAwesomeIcon
                className='key__icon'
                icon='chevron-up'
              />
            </div>
        }

        <div className="container-button-left-right-center" >
          {
            hidePan && hidePan === 'left' ?
              <>
                <div className="container-button-key_left disabled" ref={btLeftRef}>
                  <FontAwesomeIcon
                    className='key__icon'
                    icon='chevron-left'
                  />
                </div>
                <div className="container-button-key_center" ref={defaultRef} >
                  <FontAwesomeIcon
                    className='key__icon'
                    icon='redo'
                  />
                </div>
                <div className="container-button-key_right" ref={btRightRef}>
                  <FontAwesomeIcon
                    className='key__icon'
                    icon='chevron-right'
                  />
                </div>
              </>
              :
              hidePan && hidePan === 'right' ?
                <>
                  <div className="container-button-key_left " ref={btLeftRef}>
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='chevron-left'
                    />
                  </div>
                  <div className="container-button-key_center" ref={defaultRef} >
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='redo'
                    />
                  </div>
                  <div className="container-button-key_right disabled" ref={btRightRef}>
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='chevron-right'
                    />
                  </div>
                </>
                :
                <>
                  <div className="container-button-key_left " ref={btLeftRef}>
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='chevron-left'
                    />
                  </div>
                  <div className="container-button-key_center" ref={defaultRef} >
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='redo'
                    />
                  </div>
                  <div className="container-button-key_right" ref={btRightRef}>
                    <FontAwesomeIcon
                      className='key__icon'
                      icon='chevron-right'
                    />
                  </div>
                </>
          }
        </div>
        {
          hideZoom && hideZoom === 'out'  ?
            <div className="container-button-key_bottom disabled" ref={zoomOutRef}>
              <FontAwesomeIcon
                className='key__icon'
                icon='chevron-down'
              />
            </div>
            :
            <div className="container-button-key_bottom" ref={zoomOutRef}>
              <FontAwesomeIcon
                className='key__icon'
                icon='chevron-down'
              />
            </div>
        }

      </div>
    </div>
  )

}

export default KeyControls

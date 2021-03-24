import React from 'react'
import iconLeft from '../../../assets/icons/left-arrow.svg'
import iconRight from '../../../assets/icons/right-arrow.svg'
import { Button } from 'react-bootstrap'

const NavigationButton = (props) => {
  const { position, side, label, handleNavigate, id } = props
  let top = 100 + position * 55

  return (
    <Button
      className= 'navigation-button-container navigation-button-container--right'
      onClick={() => handleNavigate()}
      style={{ top }}
      variant='primary'>
      {side === 'left' ?
        <>
          {
            id === 'lobby' || id ==='hall'?
              <>
                <div className='navigation-button-container__icon' style={{ backgroundImage: 'url()' }}></div>
                <div className='navigation-button-container__label'>{label}</div>
              </>
              :
              <>
                <div className='navigation-button-container__icon' style={{ backgroundImage: `url(${iconLeft})` }}></div>
                <div className='navigation-button-container__label'>{label}</div>
              </>
          }
        </>
        :
        <>
          <div className='navigation-button-container__icon' style={{ backgroundImage: `url(${iconRight})` }}></div>
          <div className='navigation-button-container__label'>{label}</div>
        </>
      }
    </Button>
  )

}

export default NavigationButton


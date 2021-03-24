import React from 'react'
import iconLeft from '../../../assets/icons/left-arrow.svg'
import iconRight from '../../../assets/icons/right-arrow.svg'
import iconLeftDisable from '../../../assets/icons/left-arrow-disable.svg'
import iconRightDisable from '../../../assets/icons/right-arrow-disable.svg'

const NavigationButtonMobile = (props) => {
  const { disable, side, label, handleNavigate, booth } = props

  return (
    <div
      className={side === 'left' ?
        `navigation-mobile-button-container ${disable ? 'disable' : ''}` : side === 'right'?
          `navigation-mobile-button-container ${disable ? 'disable' : ''}` : side === 'desk'?
            `navigation-mobile-button-container ${disable ? 'disable' : ''}` :
            `navigation-mobile-button-container ${disable ? 'disable' : ''}`
      }
      onClick={() => handleNavigate()}
      variant='primary'>
      {side === 'left' ?
        <>
          {
            booth?
              ''
              :
              <div className='navigation-mobile-button-container__icon' style={{ backgroundImage: `url(${disable ? iconLeftDisable : iconLeft})` }}></div>
          }
          <div style={{fontSize:`${booth ? '13px' : '10px'}`}} className={`navigation-mobile-button-container__label ${disable ? 'disable' : ''}`}>{label}</div>
        </>
        :
        side === 'right'?
          <>
            <div style={{fontSize:`${booth ? '13px' : '10px'}`}} className={`navigation-mobile-button-container__label ${disable ? 'disable' : ''}`}>{label}</div>
            {
              booth?
                ''
                :
                <div className='navigation-mobile-button-container__icon' style={{ backgroundImage: `url(${disable ? iconRightDisable : iconRight})` }}></div>
            }
          </>
          :
          side === 'desk'?
            <div className={`navigation-mobile-button-container__label ${disable ? 'disable' : ''}`}>{label}</div>
            :
            <div className={`navigation-mobile-button-container__label ${disable ? 'disable' : ''}`}>{label}</div>
      }
    </div>
  )
}

export default NavigationButtonMobile

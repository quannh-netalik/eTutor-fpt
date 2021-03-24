import React, { useState } from 'react'
import {  Button } from 'react-bootstrap'
import { BoothServices } from '../../../services'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Markdown from 'markdown-to-jsx'
import { limitLengthText } from '../../../ultils'

const PopupBooth = (props) => {
  const history = useHistory()
  const [dataBooth, setDataBooth] = useState(null)
  const { id, top, left } = props

  useQuery(
    BoothServices.GET_BOOTH(id),
    {
      onCompleted: data => {
        setDataBooth(data.booth)
      }
    })

  const openBooth = () => {
    document.body.style.cursor = 'default'
    history.push(`/booth/${id}`)
  }

  if (id && top > 0 && left > 0) {
    return (
      <div style={{ top, left }} className='popup-container'>
        <div className='popup-container__body'>
          <div className='body__left'>
            <div className='left__avatar'>
              <img className='avatar__img' src={dataBooth?.avatar} />
            </div>
            <Button
              className='footer__button'
              variant='outline-primary'
              size='sm'
              onClick={() => openBooth()}>
              VISIT BOOTH
            </Button>
          </div>

          <div className='body__right'>
            <div className='right__name'>{dataBooth?.name}</div>
            <div className='right__description'>
              <Markdown>{limitLengthText(dataBooth?.aboutUs || '', 230)}</Markdown>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default PopupBooth

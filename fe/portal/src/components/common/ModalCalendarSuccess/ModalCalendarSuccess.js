import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import { Row, Col, Spinner } from 'react-bootstrap'
import { AddToCalendarComponent } from '../../common'
import { checkMobile, startHour, endHour } from '../../../ultils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalCalendarSuccess = (props) => {
  const { appointmentTemplate, selectDay, selectHour, isLoading, reAppointment, handleResendEmail, inputValues } = props
  return (
    <>
      {
        checkMobile() ?
          <div className='calendly-modal-mobile__success'>
            <div className='calendly-modal-mobile__success--top'>
              <div >
                <FontAwesomeIcon
                  className='icon'
                  style={{ fontSize: '40px' }}
                  icon='check-circle' />
              </div>
              <div className='result'>You are scheduled with {appointmentTemplate?.title || ''}</div>
              <div className='description'>
                A confirmation email for your upcoming appointment has been sent to your email
                <span className='sub-description'> ({inputValues.email})</span>
              </div>
              <div className='button'>
                <FontAwesomeIcon
                  style={{ fontSize: '15px', marginRight: '10px' }}
                  icon='plus-circle' />
                
                <AddToCalendarComponent appointmentTemplate={appointmentTemplate} selectDay={selectDay} selectHour={selectHour}/>
              </div>
            </div>
            <div className='calendly-modal-mobile__success--bottom'>
              <Row className='time-container'>
                <Col>
                  <div className='time-container__label'>Date</div>
                  <div className='time-container__content'>{moment(selectDay || 0)?.format('DD MMMM YYYY')}</div>
                </Col>
                <Col>
                  <div className='time-container__label'>Time</div>
                  <span className='time-container__content'>{`${reAppointment || selectHour ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : 'No time selected'}`}</span>
                  <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                </Col>
              </Row>
              <div className='button-link' onClick={() => handleResendEmail()}>
                {isLoading ? <Spinner
                  as='span'
                  animation='border'
                  size='md'
                  role='status'
                /> : 'RESEND EMAIL CONFIRMATION'}
              </div>
            </div>
          </div>
          :
          <div className='calendly-modal__success'>
            <div className='calendly-modal__success--top'>
              <div >
                <FontAwesomeIcon
                  className='icon'
                  style={{ fontSize: '60px' }}
                  icon='check-circle' />
              </div>
              <div className='result'>You are scheduled with {appointmentTemplate?.title || ''}</div>
              <div className='description'>
                A confirmation email for your upcoming appointment has been sent to your email
                <span className='sub-description'> ({inputValues.email})</span>
              </div>
              <div className='button'>
                <FontAwesomeIcon
                  style={{ fontSize: '20px', marginRight: '10px' }}
                  icon='plus-circle' />
                <AddToCalendarComponent appointmentTemplate={appointmentTemplate} selectDay={selectDay} selectHour={selectHour}/>
              </div>
            </div>
            <div className='calendly-modal__success--bottom'>
              <Row className='time-container'>
                <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6} >
                  <div className='time-container__label'>Date</div>
                  <div className='time-container__content'>{moment(selectDay || 0)?.format('DD MMMM YYYY')}</div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                  <div className='time-container__label'>Time</div>
                  <span className='time-container__content'>{`${reAppointment || selectHour ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : 'No time selected'}`}</span>
                  <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                </Col>
              </Row>
              <div className='button-link' onClick={() => handleResendEmail()}>
                {isLoading ? <Spinner
                  as='span'
                  animation='border'
                  size='md'
                  role='status'
                /> : 'RESEND EMAIL CONFIRMATION'}

              </div>
            </div>
          </div>
      }
    </>
  )
}

export default ModalCalendarSuccess
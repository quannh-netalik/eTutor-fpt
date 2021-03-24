import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import { Row, Col, Spinner } from 'react-bootstrap'
import { checkMobile, startHour, endHour } from '../../../ultils'

const ModalCalendarCancel = (props) => {
  const { appointmentTemplate, selectDay, selectHour, appointments, handleCancel, isLoading, user, isExhibitor } = props
  return (
    <>
      {
        checkMobile() ?
          <div className='calendly-modal-mobile__cancel'>
            <div className='calendly-modal-mobile__cancel--top'>
              <div className='result'>Your schedule with {appointmentTemplate?.title || ''}</div>
            </div>
            {
              !isExhibitor ? appointments.filter(appointment => (appointment.user && appointment.user.id) && (appointment.appointment_template.id === appointmentTemplate.id) && appointment?.user?.id === user?.id).slice(0, 1).map(appointment => (
                <div className='calendly-modal-mobile__cancel--bottom' key={appointment.id}>
                  <Row className='time-container'>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <div className='time-container__label'>Date</div>
                      <div className='time-container__content'>{moment(appointment.start || 0)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('DD MMMM YYYY')}</div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <div className='time-container__label'>Time</div>
                      <span className='time-container__content'>
                        {`${selectHour || selectDay ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : `${appointment.startHour} - ${appointment.endHour}`}`}
                      </span>
                      <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                    </Col>
                  </Row>
                  <div className='button-link' onClick={() => handleCancel(appointment.id)}>
                    {isLoading ? <Spinner
                      as='span'
                      animation='border'
                      size='md'
                      role='status'
                    /> : 'CANCEL YOUR SCHEDULE'}
                  </div>
                </div>
              ))
              :
              <div className='calendly-modal-mobile__cancel--bottom'>
                <Row className='time-container'>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <div className='time-container__label'>Date</div>
                    <div className='time-container__content'>{moment(appointments.filter(appointment => appointment.user && user && appointment.user.id === user.id)[0].start || 0)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('DD MMMM YYYY')}</div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <div className='time-container__label'>Time</div>
                    <span className='time-container__content'>{appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0]?.startHour} - {appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0]?.endHour}</span>
                    <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                  </Col>
                </Row>
                <div className='button-link' onClick={() => handleCancel(appointments.filter(appointment => appointment.user && user && appointment.user.id === user.id)[0].id)}>
                  {isLoading ? <Spinner
                    as='span'
                    animation='border'
                    size='md'
                    role='status'
                  /> : 'CANCEL YOUR SCHEDULE'}
                </div>
              </div>
            }
          </div>
          :
          <div className='calendly-modal__cancel'>
            <div className='calendly-modal__cancel--top'>
              <div className='result'>Your schedule with {appointmentTemplate?.title || ''}</div>
            </div>
            {
              !isExhibitor ? appointments.filter(appointment => (appointment.user && appointment.user.id) && (appointment.appointment_template.id === appointmentTemplate.id) && (appointment?.user?.id === user?.id)).slice(0, 1).map(appointment => (
                <div className='calendly-modal__cancel--bottom' key={appointment.id}>
                  <Row className='time-container'>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                      <div className='time-container__label'>Date</div>
                      <div className='time-container__content'>{moment(appointment.start || 0)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('DD MMMM YYYY')}</div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                      <div className='time-container__label'>Time</div>
                      <div className='result-children__content'>
                        {`${selectHour || selectDay ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : `${appointment.startHour} - ${appointment.endHour}`}`}
                      </div>
                      <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                    </Col>
                  </Row>
                  <div className='button-link' onClick={() => handleCancel(appointment.id)}>
                    {isLoading ? <Spinner
                      as='span'
                      animation='border'
                      size='md'
                      role='status'
                    /> : 'CANCEL YOUR SCHEDULE'}
                  </div>
                </div>
              ))
              :
              <div className='calendly-modal__cancel--bottom'>
                <Row className='time-container'>
                  <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                    <div className='time-container__label'>Date</div>
                    <div className='time-container__content'>{moment(appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0].start || 0)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('DD MMMM YYYY')}</div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={6}>
                    <div className='time-container__label'>Time</div>
                    <span className='time-container__content'>{appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0]?.startHour} - {appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0]?.endHour}</span>
                    <span className='time-container__sub-content'>({appointmentTemplate?.dateRange?.timeZone?.label || ''})</span>
                  </Col>
                </Row>
                <div className='button-link' onClick={() => handleCancel(appointments.filter(appointment => appointment.user && user && appointment?.user?.id === user.id)[0].id)}>
                  {isLoading ? <Spinner
                    as='span'
                    animation='border'
                    size='md'
                    role='status'
                  /> : 'CANCEL YOUR SCHEDULE'}
                </div>
              </div>
            }
          </div>
      }
    </>
  )
}

export default ModalCalendarCancel
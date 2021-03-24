import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import { checkMobile, startHour, endHour } from '../../../ultils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ModalCalendarDescription = (props) => {
  const { appointmentTemplate, reAppointment, selectHour, selectDay } = props
  return (
    <>
      {
        checkMobile() ?
          <>
            <div className='calendly-modal-mobile__body-left'>
              <div className='name-booth'>{appointmentTemplate?.title || ''}</div>
              <div className='time-meet'>
                <FontAwesomeIcon
                  style={{ fontSize: '13px' }}
                  icon='clock' /> {appointmentTemplate?.duration || 0} mins
              </div>
              <div className='description-meet'>
                {appointmentTemplate?.description || ''}
              </div>
              <div className='result'>
                <div className='result-children'>
                  <div className='result-children__label'>Date</div>
                  <div className='result-children__content'>{selectDay ? moment(selectDay)?.format('DD MMMM YYYY') : 'No date selected'}</div>
                </div>
                <div className='result-children'>
                  <div className='result-children__label'>Time</div>
                  <div className='result-children__content'>{`${reAppointment || selectHour ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : 'No time selected'}`}</div>
                  <div className='result-children__sub-content'>{appointmentTemplate?.dateRange?.timeZone?.label || ''}</div>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className='calendly-modal__body-left'>
              <div className='name-booth'>{appointmentTemplate?.title || ''}</div>
              <div className='time-meet'>
                <FontAwesomeIcon
                  style={{ fontSize: '13px' }}
                  icon='clock' /> {appointmentTemplate?.duration || 0} mins
              </div>
              <div className='description-meet'>
                {appointmentTemplate?.description || ''}
              </div>
              <div className='result'>
                <div className='result-children'>
                  <div className='result-children__label'>Date</div>
                  <div className='result-children__content'>{selectDay ? moment(selectDay)?.format('DD MMMM YYYY') : 'No date selected'}</div>
                </div>
                <div className='result-children'>
                  <div className='result-children__label'>Time</div>
                  <div className='result-children__content'>{`${reAppointment || selectHour ? startHour(selectDay, selectHour, appointmentTemplate) + ' - ' + endHour(selectDay, selectHour, appointmentTemplate) : 'No time selected'}`}</div>
                  <div className='result-children__sub-content'>{appointmentTemplate?.dateRange?.timeZone?.label || ''}</div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default ModalCalendarDescription
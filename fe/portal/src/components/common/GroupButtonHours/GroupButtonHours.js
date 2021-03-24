import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import { Button } from 'react-bootstrap'
import { clearHourDate, minutesToHours, hoursToMinutes } from '../../../ultils'

const compareDate = (date1, date2) => {
  if ((moment(date1).get('date') === moment(date2).get('date')) && (moment(date1).get('month') === moment(date2).get('month')) && (moment(date1).get('year') === moment(date2).get('year'))) {
    return true
  } else {
    return false
  }
}

const getHourTimeZone = (date, appointmentTemplate) =>{
  return moment(date)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('HH:mm')
}

const sortAvailability = (availabilitys, appointmentTemplate) =>{
  let newAvailabilitys = availabilitys.sort(function (a, b) {
    let startA = hoursToMinutes(moment(a.start)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('HH:mm'))
    let startB = hoursToMinutes(moment(b.start)?.tz(appointmentTemplate?.dateRange?.timeZone?.value)?.format('HH:mm'))
    if (startA < startB) {
      return -1
    }
    if (startA > startB) {
      return 1
    }
    return 0
  })
  return newAvailabilitys
}

const GroupButtonHours = (props) => {
  const { appointmentTemplate, selectDay, selectHour, handleHour, appointments } = props
  return (
    <>
      {
        appointmentTemplate?.listAvailability?.filter(time => compareDate(new Date(time.date.year, time.date.month, time.date.date), moment(selectDay))).length > 0 ?
        sortAvailability(appointmentTemplate.listAvailability, appointmentTemplate).filter(time => compareDate(new Date(time.date.year, time.date.month, time.date.date), moment(selectDay))).map((time, index) => {
            
            let groupButtonHtml = []
            let k = 0
            if (time.start && time.end) {
              for (let i = 0; i < 1;) {
                if ((Number(hoursToMinutes(time.start)) + Number(appointmentTemplate?.duration) * k) < Number(hoursToMinutes(time.end))) {
                  let numberMinutesTimeZone = Number(hoursToMinutes(time.start)) + (Number(appointmentTemplate?.duration) * k)
                  k += 1
                  let count = groupButtonHtml.length
                  appointments.forEach((appointment) => {
                    if ((Number(hoursToMinutes(appointment.startHour)) === numberMinutesTimeZone) && compareDate(new Date(moment(appointment.start).tz(appointmentTemplate?.dateRange?.timeZone?.value).get('years'), moment(appointment.start).tz(appointmentTemplate?.dateRange?.timeZone?.value).get('months'), moment(appointment.start).tz(appointmentTemplate?.dateRange?.timeZone?.value).get('date')), new Date(selectDay))) {
                      groupButtonHtml.push(<Button variant='outline-secondary' disabled key={numberMinutesTimeZone} className='button-disable'>{minutesToHours(numberMinutesTimeZone)}</Button>)
                    }
                  })
                  if (count === groupButtonHtml.length) {
                    groupButtonHtml.push(<Button variant={`${selectHour == minutesToHours(numberMinutesTimeZone) ? 'primary' : 'outline-primary'}`} key={numberMinutesTimeZone} onClick={() => handleHour(minutesToHours(numberMinutesTimeZone))} className={`${selectHour == minutesToHours(numberMinutesTimeZone) ? 'button-select' : 'button'}`}>{minutesToHours(numberMinutesTimeZone)}</Button>)
                  }
                } else {
                  i++
                }
              }
            }
            if (groupButtonHtml.length > 0) {
              return (
                <div key={index}>
                  {
                    groupButtonHtml.map((html, index) => (
                      html
                    ))
                  }
                </div>
              )
            }
          })
          :
          <div style={{ textAlign: 'center' }}>
            Booth has no appointment available
          </div>
      }
    </>
  )
}

export default GroupButtonHours
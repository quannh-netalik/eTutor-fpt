import React from 'react'
import moment from 'moment'
import 'moment-timezone'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Prev2Label, Next2Label, NextLabel, PrevLabel } from '../../common'
import { clearHourDate } from '../../../ultils'

const compareDate = (date1, date2) => {
  if ((moment(date1).get('date') >= moment(date2).get('date')) && (moment(date1).get('month') >= moment(date2).get('month')) && (moment(date1).get('year') >= moment(date2).get('year'))) {
    return true
  } else {
    return false
  }
}
const CalendarComponent = (props) => {
  const { appointmentTemplate, selectDay, setSelectDay, setSelectHour } = props
  return (
    <>
      <Calendar onClickDay={(value) => {
        if (appointmentTemplate?.dateRange?.start || appointmentTemplate?.dateRange?.end) {
          setSelectDay(new Date(moment(value).get('years'), moment(value).get('months'), moment(value).get('date'), 12 ))
          setSelectHour(null)
        }
      }}
      value={selectDay ? new Date(moment(selectDay)?.get('years'), moment(selectDay)?.get('months'), moment(selectDay)?.get('date')) : selectDay}
      minDate={compareDate(moment().tz(appointmentTemplate?.dateRange?.timeZone?.value),moment(appointmentTemplate?.dateRange?.start).tz(appointmentTemplate?.dateRange?.timeZone?.value)) ? new Date() : new Date(moment(appointmentTemplate?.dateRange?.start).tz(appointmentTemplate?.dateRange?.timeZone?.value))}
      maxDate={appointmentTemplate?.dateRange?.end ? new Date(clearHourDate(appointmentTemplate?.dateRange?.end, appointmentTemplate)?.get('years'), clearHourDate(appointmentTemplate?.dateRange?.end, appointmentTemplate)?.get('months'), clearHourDate(appointmentTemplate?.dateRange?.end, appointmentTemplate).get('date')) : new Date()}
      prev2Label={<Prev2Label />}
      next2Label={<Next2Label />}
      nextLabel={<NextLabel />}
      prevLabel={<PrevLabel />}
      />
    </>
  )
}

export default CalendarComponent
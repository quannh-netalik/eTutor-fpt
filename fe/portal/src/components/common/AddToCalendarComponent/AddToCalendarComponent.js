import React from 'react'
import moment from 'moment'
import AddToCalendar from 'react-add-to-calendar'
import 'moment-timezone'
import { hoursToMinutes, clearHourDate } from '../../../ultils'

const AddToCalendarComponent = (props) => {
  const { appointmentTemplate, selectDay, selectHour, optionsOpen } = props
  return (
    <AddToCalendar optionsOpen={optionsOpen ? true : false} buttonLabel="Add To Your Calendar" buttonIconClass={{ textDecoration: 'none' }} listItems={[{ google: 'Google' }, { outlookcom: 'Outlook' }]} event={
      {
        title: appointmentTemplate?.title || '',
        description: appointmentTemplate?.description || '',
        location: appointmentTemplate?.dateRange?.timeZone?.value || 'Portland, OR',
        startTime: selectDay && selectHour && moment(clearHourDate(selectDay,appointmentTemplate)).add(Number(hoursToMinutes(selectHour)), 'minutes') || '',
        endTime: selectDay && selectHour && moment(clearHourDate(selectDay, appointmentTemplate)).add(Number(hoursToMinutes(selectHour)) + Number(appointmentTemplate?.duration), 'minutes') || '',
      }
    } />
  )
}

export default AddToCalendarComponent
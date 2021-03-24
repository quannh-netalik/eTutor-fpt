
import React, { useEffect } from 'react'
import { Toast } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Toast notification
 * @param {Object} props
 * props.notifications: list of the notification
 * noti.toastId: id of the notification, randomized, to distinguish with eachother
 * noti.notificationId: id of the notification received from backend
 * noti.type: type of the notification ('error', 'info', 'warning', 'success')
 * noti.title: title of the notification
 * noti.body: description of the notification
 */
const ToastNotification = (props) => {
  const { notifications, dispatch } = props
  const typeIcons = [
    { type: 'error', prefix: 'far', icon: 'times-circle' },
    { type: 'info', prefix: 'fas', icon: 'info-circle' },
    { type: 'warning', prefix: 'fas', icon: 'exclamation-triangle' },
    { type: 'success', prefix: 'fa', icon: 'check-circle' },
    { type: 'message', prefix: 'fa', icon: 'envelope' }
  ]
  useEffect(() => {
    let timer = setTimeout(() => {
      if (notifications)
        notifications.map(noti => {
          dispatch(removeNotification(noti.toastId))
        })
    }, 6000)
    return () => clearTimeout(timer)
  })


  return (
    <div className='toast-notification-container'>
      {notifications ? notifications.map(noti => {
        return (
          <Toast
            className='toast-notification-container__toast toast--fadeIn'
            key={noti.toastId}
            onClose={() => dispatch(removeNotification(noti.toastId))}
          >
            <Toast.Header className={`toast__header toast__header--${noti.type}`}>
              <FontAwesomeIcon
                className='header__icon'
                icon={typeIcons.filter(v => v.type === noti.type).map(v => [v.prefix, v.icon])[0]}
              />

              <strong className='mr-auto header__title'>{noti.title}</strong>
            </Toast.Header>
            {
              noti.type === 'message'?
                <Toast.Body style={{ wordBreak: 'break-word' }}>
                  <img src = {noti.body.avatar} style={{marginRight:'20px'}} width='40px' height='40px' />
                  {noti.body.message}
                </Toast.Body>
                :
                <Toast.Body style={{ wordBreak: 'break-word' }}>{noti.body}</Toast.Body>
            }
          </Toast>
        )
      }) : ''}
    </div>
  )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(ToastNotification)

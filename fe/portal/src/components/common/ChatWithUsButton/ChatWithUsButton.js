import React from 'react'
import { Button } from 'react-bootstrap'
import messageIcon from '../../../assets/icons/message.svg'

const ChatWithUsButton = (props) => {
  const { position, side, label, handleStartConversation, type } = props

  return (
    <Button
      style={{ top: type === 'information' && 'auto', bottom: type === 'information' && '40px' }}
      className='chat-with-us-button'
      variant='info'
      onClick={() => { handleStartConversation() }}>
      <div className='chat-with-us-button__text'>LIVE CHAT</div>
      <div
        className='chat-with-us-button__icon'
        style={{ backgroundImage: `url(${messageIcon})` }}
      ></div>
    </Button>
  )
}

export default ChatWithUsButton

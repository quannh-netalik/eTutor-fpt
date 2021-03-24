import React, { useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ConnectionServices } from '../../../../services'
import { loginFailed, loginSuccess, setShowConnectionModal } from '../../../../actions'
import { extractObjectKey } from '../../../../ultils'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/react-hooks'
import { addNotification } from '../../../../actions'
import { useHistory, Link } from 'react-router-dom'

const logo = '/logo.png'

const ForgotPassword = (props) => {
  const { setConnectionType, dispatch } = props
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotSuccess, setIsForgotSucess] = useState(false)
  const [inputValues, setInputValues] = useState({
    email: ''
  })

  const [forgotPassword] = useMutation(ConnectionServices.FORGOT_PASSWORD(), { errorPolicy: 'all' })

  const handleOnChange = event => {
    const value = event.target.value
    const id = event.target.id
    setInputValues({ ...inputValues, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsForgotSucess(false)
    try {

      const { data } = await forgotPassword({
        variables: { email: inputValues.email },
      })
      setIsForgotSucess(true)
    } catch (e) {
      let extractedErr = extractObjectKey(e, 'messages')
      if (extractedErr) {
        extractedErr = extractedErr[0]
      } else {
        extractedErr = e
      }
      dispatch(addNotification({
        notificationId: extractedErr.id,
        type: 'error',
        title: 'Forgot password request failed!',
        body: extractedErr.message
      }))
    }
    setIsLoading(false)
  }
  return (
    <>
      <Modal.Header>
        <Modal.Title className='connection-modal__title'>
          FORGOT PASSWORD
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='connection-modal__login-modal__form' onSubmit={handleSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              value={inputValues.email}
              type='email'
              placeholder='email@example.com'
              autoComplete='current-email' />
          </Form.Group>
          {isForgotSuccess &&
            <Form.Label className='form__success-message'>An email has been sent to you. Please follow the link to complete your password reset request.</Form.Label>
          }
          <Button variant='primary' disabled={isLoading} type='submit' block className='form__button'>
            {isLoading ? <Spinner
              as='span'
              animation='border'
              size='md'
              role='status'
            /> : 'Submit'}
          </Button>
          <Form.Group className='form__bottom-link'>
            <a href='#' className='bottom-link__link' onClick={() => setConnectionType('login')}>Have an account? Login.</a>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  )
}



export default connect(null)(ForgotPassword)


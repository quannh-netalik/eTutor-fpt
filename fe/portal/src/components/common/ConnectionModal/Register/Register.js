import React, { useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ConnectionServices } from '../../../../services'
import { useMutation } from '@apollo/react-hooks'
import Spinner from 'react-bootstrap/Spinner'
import { loginSuccess, setShowConnectionModal, setUnMuteMusic, setBackgroundMusic, setMuteMusic, setUnBackgroundMusic, addNotification,  } from '../../../../actions'
import { extractObjectKey } from '../../../../ultils'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

const logo = '/logo.png'

const Register = (props) => {
  const { setConnectionType, dispatch, backgroundMusic, isMute } = props

  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState({
    email: '', password: '', firstName: '', lastName: '', confirmpassword: ''
  })
  let history = useHistory()

  const [register] = useMutation(ConnectionServices.REGISTER(), { errorPolicy: 'all' })

  const handleOnChange = event => {
    const { id, value } = event.target
    setInputValues({ ...inputValues, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (inputValues.password === inputValues.confirmpassword) {
      try {
        const variables = {
          email: inputValues.email,
          username: inputValues.email,
          password: inputValues.password,
          isRegister: true,
          user_datum: {
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            fullName: inputValues.firstName + inputValues.lastName
          }
        }
        const { data } = await register({
          variables: { input: variables },
        })
        await Cookies.set('access_token', data.register.jwt, { expires: 2 })
        dispatch(loginSuccess(data.register.user, data.register.jwt))
        dispatch(addNotification({
          type: 'success',
          title: 'Register successfully',
          body: 'You have successfully registered in'
        }))
        if(navigator && navigator.userAgent){
          let ua = navigator.userAgent.toLowerCase()
          console.log(ua.indexOf('safari'), ua.indexOf('chrome'))
          if(ua.indexOf('safari') !== -1){
            if(ua.indexOf('chrome') > -1){
              if(!backgroundMusic && isMute){
                dispatch(setUnMuteMusic())
                dispatch(setBackgroundMusic())
              }
            }else{
              if(!backgroundMusic && isMute){
                dispatch(setMuteMusic())
                dispatch(setUnBackgroundMusic())
              }
            }
          }else{
            if(!backgroundMusic && isMute){
              dispatch(setUnMuteMusic())
              dispatch(setBackgroundMusic())
            }
          }
        }else{
          if(!backgroundMusic && isMute){
            dispatch(setUnMuteMusic())
            dispatch(setBackgroundMusic())
          }
        }
        
        setConnectionType('login')
        dispatch(setShowConnectionModal(false))
        history.push('/lobby')
      } catch (e) {
        let extractedErr = extractObjectKey(e, 'messages')
        if (extractedErr) {
          extractedErr = extractedErr[0]
        } else {
          extractedErr = e
        }
        dispatch(addNotification({
          toastId: Math.random().toString(36).substring(2),
          notificationId: extractedErr.id,
          type: 'error',
          title: 'Register failed',
          body: extractedErr.message
        }))
      }
    } else {
      dispatch(addNotification({
        toastId: Math.random().toString(36).substring(2),
        type: 'error',
        title: 'Not Match Password',
      }))
    }
    setIsLoading(false)
  }

  return (
    <>
      <Modal.Header>
        <Modal.Title className='connection-modal__title'>
          REGISTER
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='connection-modal__login-modal__form' onSubmit={handleSubmit}>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label >First name:</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  value={inputValues.firstName}
                  id='firstName'
                  type='text'
                  placeholder='First name'
                  autoComplete='off' />
              </Col>
              <Col>
                <Form.Label >Last name:</Form.Label>
                <Form.Control
                  onChange={handleOnChange}
                  value={inputValues.lastName}
                  id='lastName'
                  type='text'
                  placeholder='Last name'
                  autoComplete='off' />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              value={inputValues.email}
              type='email'
              placeholder='email@example.com'
              autoComplete='current-email' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              value={inputValues.password}
              type='password'
              placeholder='***********'
              autoComplete='current-password' />
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              value={inputValues.confirmpassword}
              type='password'
              placeholder='***********'
              autoComplete='current-password' />
          </Form.Group>
          <Button variant='primary' type='submit' block className='form__button'>
            {isLoading ? <Spinner
              as='span'
              animation='border'
              size='md'
              role='status'
            /> : 'Register'}
          </Button>
          <Form.Group className='form__bottom-link'>
            <a href='#' className='bottom-link__link' onClick={() => setConnectionType('login')}>Registered? Enter Event.</a>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  )
}

const mapStateToProps = (state) => ({
  isMute: state.backgroundMusicReducer.isMute,
  backgroundMusic: state.backgroundMusicReducer.backgroundMusic,

})

export default connect(mapStateToProps)(Register)

import React, { useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { ConnectionServices } from '../../../../services'
import { loginFailed, loginSuccess, setShowConnectionModal, setUnMuteMusic, setMuteMusic, setBackgroundMusic, setUnBackgroundMusic } from '../../../../actions'
import { extractObjectKey } from '../../../../ultils'
import Cookies from 'js-cookie'
import { useMutation } from '@apollo/react-hooks'
import { addNotification } from '../../../../actions'
import { useHistory } from 'react-router-dom'

const logo = '/logo.png'

const Login = (props) => {
  const { setConnectionType, dispatch, backgroundMusic, isMute } = props
  const [isLoading, setIsLoading] = useState(false)
  const [inputValues, setInputValues] = useState({
    email: '', password: '', rememberMe: false
  })
  let history = useHistory()

  const [login] = useMutation(ConnectionServices.LOGIN(), { errorPolicy: 'all' })

  const handleOnChange = event => {
    const value = event.target.name === 'rememberMe' ? event.target.checked : event.target.value
    const id = event.target.id

    setInputValues({ ...inputValues, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const variables = {
        identifier: inputValues.email,
        password: inputValues.password,
        portal: 'microsite'
      }
      const { data } = await login({
        variables: { input: variables },
      })
      await Cookies.set('access_token', data.login.jwt, { expires: 2 })
      dispatch(loginSuccess(data.login.user, data.login.jwt))
      dispatch(addNotification({
        type: 'success',
        title: 'Login successfully',
        body: 'You have successfully logged in'
      }))
      history.push('/lobby')
      dispatch(setShowConnectionModal(false))
      if(navigator && navigator.userAgent){
        let ua = navigator.userAgent.toLowerCase()
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
    } catch (e) {
      let extractedErr = extractObjectKey(e, 'messages')
      if (extractedErr) {
        extractedErr = extractedErr[0]
      } else {
        extractedErr = e
      }
      dispatch(loginFailed())
      dispatch(addNotification({
        notificationId: extractedErr.id,
        type: 'error',
        title: 'Login failed',
        body: extractedErr.message
      }))
    }
    setIsLoading(false)
  }
  return (
    <>
      <Modal.Header>
        <Modal.Title className='connection-modal__title'>
          ENTER EVENT
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
          <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              value={inputValues.password}
              type='password'
              placeholder='***********'
              autoComplete='current-password' />
          </Form.Group>
          <Form.Group controlId='rememberMe'>
            <Form.Check onChange={handleOnChange} name='rememberMe' id='rememberMe' type='checkbox' label='Remember me' />
          </Form.Group>
          <Button variant='primary' disabled={isLoading} type='submit' block className='form__button'>
            {isLoading ? <Spinner
              as='span'
              animation='border'
              size='md'
              role='status'
            /> : 'Enter Event'}
          </Button>
          <Form.Group className='form__bottom-link'>
            <a href='#' className='bottom-link__link' onClick={() => setConnectionType('forgot-password')}>Forgot password</a>
            <a href='#' className='bottom-link__link' onClick={() => setConnectionType('register')}>Not yet registered? Sign up</a>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  )
}

const mapStateToProps = (state) => ({
  isShowConnectionModal: state.connectionReducer.isShowConnectionModal,
  isMute: state.backgroundMusicReducer.isMute,
  backgroundMusic: state.backgroundMusicReducer.backgroundMusic,

})

export default connect(mapStateToProps)(Login)

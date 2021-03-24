import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import { setShowConnectionModal } from '../../../actions'

const ConnectionModal = (props) => {
  const { isShowConnectionModal, dispatch, isLogged,
    isAllowLogin, disableLoginMessage } = props

  const [connectionType, setConnectionType] = useState('login')

  if (!isLogged) {
    return (
      <Modal
        size={isAllowLogin ? 'md' : 'lg'}
        show={isShowConnectionModal}
        onHide={() => dispatch(setShowConnectionModal(false))}
        className={isAllowLogin && 'connection-modal'}
        dialogClassName={isAllowLogin && 'connection-modal__dialog'}
        centered
      >
        {isAllowLogin ?
          <>
            {connectionType === 'forgot-password' ? <ForgotPassword setConnectionType={setConnectionType} />
              : connectionType === 'register' ? <Register setConnectionType={setConnectionType} />
                : <Login setConnectionType={setConnectionType} />
            }
          </>
          : <div style={{ padding: 30 }}>{disableLoginMessage}</div>
        }

      </Modal>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  isShowConnectionModal: state.connectionReducer.isShowConnectionModal,
  isAllowLogin: state.connectionReducer.isAllowLogin,
  disableLoginMessage: state.connectionReducer.disableLoginMessage,
})

export default connect(mapStateToProps)(ConnectionModal)

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addClickCollector, setShowResourceHubMobile } from '../../../actions'
import folderIcon from '../../../assets/icons/folder.svg'
import ResourceHub from '../../pages/Booth/Menu/ResourceHub'

const ResourceHubButtonMobile = (props) => {
  const { booth, dispatch, user } = props

  const handleClick = () => {
    dispatch(addClickCollector('resourceHub', 'Resource Hub Clicked', user.id, booth.id))
    dispatch(setShowResourceHubMobile(booth))
  }
  return (
    <div>
      <Button
        className='resource-hub-button-mobile'
        variant='secondary'
        onClick={() => handleClick()}>
        <div
          className='resource-hub-button-mobile__icon'
          style={{ backgroundImage: `url(${folderIcon})` }}
        ></div>
      </Button>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    user: state.connectionReducer.user,
  }
}
export default connect(mapStateToProps)(ResourceHubButtonMobile)

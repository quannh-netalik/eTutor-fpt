import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { addClickCollector } from '../../../actions'
import folderIcon from '../../../assets/icons/folder.svg'
import ResourceHub from './../../pages/Booth/Menu/ResourceHub'


const ResourceHubButton = (props) => {
  const { booth, dispatch, user } = props
  const [isShowResourceHub, setIsShowResourceHub] = useState(false)

  const handleClick = () => {
    dispatch(addClickCollector('resourceHub', 'Resource Hub Clicked', user.id, booth.id))
    setIsShowResourceHub(true)
  }
  return (
    <div>
      <ResourceHub
        isShowResourceHub={isShowResourceHub}
        setIsShowResourceHub={setIsShowResourceHub}
        booth={booth} />
      <Button
        className='resource-hub-button'
        variant='secondary'
        onClick={() => handleClick()}>
        <div className='resource-hub-button__text'>RESOURCE HUB</div>
        <div
          className='resource-hub-button__icon'
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
export default connect(mapStateToProps)(ResourceHubButton)

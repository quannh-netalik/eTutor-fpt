import React from 'react'
import {
  setMuteMusic,
  setUnMuteMusic,
  setBackgroundMusic,
  setUnBackgroundMusic,
} from './../../../actions'
import { connect } from 'react-redux'
import volumeUpIcon from '../../../assets/icons/volume-up.svg'
import volumeDownIcon from '../../../assets/icons/volume-down.svg'

const VolumeButtonMobile = (props) => {
  const { isMute, dispatch, lobby, booth } = props
  return (
    <div
      style={{
        top: `${
          booth === 'information' ? 'calc(100% - 160px)' : 'calc(100% - 100px)'
        }`,
      }}
      className="container-volume-mobile"
    >
      {!isMute ? (
        <div
          className={`${
            lobby?.musicSrc ? '' : 'disabled'
          } container-volume-button `}
          onClick={() => {
            if (lobby?.musicSrc) {
              dispatch(setMuteMusic())
              dispatch(setUnBackgroundMusic())
            }
          }}
        >
          <img src={volumeUpIcon} className="volume__icon" />
        </div>
      ) : (
        <div
          className={`${
            lobby?.musicSrc ? '' : 'disabled'
          } container-volume-button `}
          onClick={() => {
            if (lobby?.musicSrc) {
              dispatch(setUnMuteMusic())
              dispatch(setBackgroundMusic())
            }
          }}
        >
          <img src={volumeDownIcon} className="volume__icon" />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isMute: state.backgroundMusicReducer.isMute,
    lobby: state.lobbyReducer.lobby,
  }
}

export default connect(mapStateToProps)(VolumeButtonMobile)

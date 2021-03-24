import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, ResetPassword, Dashboard } from './pages'
import PrivateRoute from './PrivateRoute'
import { Navbar, ToastNotification } from './layouts'
import {
  faBell,
  faInfoCircle,
  faExclamationTriangle,
  faTimes,
  faFilm,
  faExternalLinkAlt,
  faDownload,
  faFileAlt,
  faChevronUp,
  faChevronDown,
  faEllipsisH,
  faPaperclip,
  faCheck,
  faUnlink,
  faSearch,
  faMusic,
  faVolumeMute,
  faVolumeOff,
  faVolumeDown,
  faVolumeUp,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faCaretRight,
  faCaretLeft,
  faClock,
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faPlusCircle,
  faRedo,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons'
import {
  faTimesCircle,
  faSmile,
  faFileImage,
} from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'emojione-picker/css/picker.css'

library.add(
  faFileAlt,
  faDownload,
  faBell,
  faTimesCircle,
  faExternalLinkAlt,
  faInfoCircle,
  faExclamationTriangle,
  faTimes,
  faSmile,
  faFileImage,
  faFilm,
  faChevronUp,
  faChevronDown,
  faEllipsisH,
  faPaperclip,
  faCheck,
  faUnlink,
  faSearch,
  faMusic,
  faVolumeMute,
  faVolumeOff,
  faVolumeDown,
  faVolumeUp,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faCaretRight,
  faCaretLeft,
  faClock,
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faPlusCircle,
  faRedo,
  faWindowMinimize
)

const App = () => {
  return (
    <>
      <Router>
        <ToastNotification />
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <PrivateRoute path={['/dashboard',]}>
            <Route exact path='/dashboard' component={Dashboard} />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  )
}

export default App

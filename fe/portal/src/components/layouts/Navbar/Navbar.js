import React, { useState, useEffect } from 'react'
import {
  Nav,
  Navbar as BootStrapNavBar,
  Container,
  Button
} from 'react-bootstrap'
import { ConnectionModal, DisconnectOverlay } from '../../common'
import { connect } from 'react-redux'
import logo from '../../../assets/images/logo.png'
import { Link, useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Cookies from 'js-cookie'

const Navbar = (props) => {
  
  return (
    <>
      <BootStrapNavBar expand="md" className='navbar-container' >
        <Container>
          <BootStrapNavBar.Brand>
            <Link
              to={'/'}
              className='navbar-container__brand-image navbar-brand'
              style={{ backgroundImage: `url(${ logo})` }}
            ></Link>
          </BootStrapNavBar.Brand>
            <BootStrapNavBar.Toggle aria-controls="basic-navbar-nav" />
            <BootStrapNavBar.Collapse id="basic-navbar-nav" >
              <Nav className='ml-auto' style={{ background: 'white' }}>
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
                <Nav.Item>
                  <Link to='/dashboard' className='navbar-container__nav-link'>Dashboard</Link>
                </Nav.Item >
              </Nav>
            </BootStrapNavBar.Collapse>
          <ConnectionModal />
        </Container>
      </BootStrapNavBar >
    </>
  )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Navbar)

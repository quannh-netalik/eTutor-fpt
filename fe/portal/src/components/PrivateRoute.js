import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { loginSuccess } from '../actions'
import jwtDecode from 'jwt-decode'


const PrivateRoute = (props) => {
  const { component: Component, role, user, isLogged, dispatch, ...rest } = props
  try {
    if (!isLogged || !user) {
      let token = Cookies.get('access_token')
      let currentUserDatum = Cookies.get('current_user_datum')
      let decoded = jwtDecode(token)
      if (decoded.user.role.type !== 'authenticated') throw Error
      if(currentUserDatum){
        dispatch(loginSuccess({
          ...decoded.user,
          user_datum: { ...JSON.parse(currentUserDatum) }
        }, token))
      }else{
        dispatch(loginSuccess(decoded.user, token))
      }
      return <Route {...rest} render={routeProps => <Component />} />
    } else {
      return <Route {...rest} render={routeProps => <Component />} />
    }
  } catch (e) {
    Cookies.remove('access_token')
    return <Redirect to={{ pathname: '/' }} />
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  user: state.connectionReducer.user,
})

export default connect(mapStateToProps)(PrivateRoute)

import axios from 'axios'

import * as actionsTypes from './actionsTypes'
import logo from '../../components/Logo/Logo'

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    token,
    userId,
  }
}

export const authFail = (error) => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  return {
    type: actionsTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())

    const url = isSignUp ?
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-MC64yT3fhV7v5-YdAPnv2_Rt8WuYyyo' :
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC-MC64yT3fhV7v5-YdAPnv2_Rt8WuYyyo'
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    axios.post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error))
      })
  }
}

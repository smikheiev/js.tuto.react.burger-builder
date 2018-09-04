import axios from 'axios'

import * as actionsTypes from './actionsTypes'

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
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
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
        const expirationDate = new Date(Date.now() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error))
      })
  }
}

export const setRedirectPath = (path) => {
  return {
    type: actionsTypes.AUTH_SET_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - Date.now()) / 1000))
      }
    }
  }
}

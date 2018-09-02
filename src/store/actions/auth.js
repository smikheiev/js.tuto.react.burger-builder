import axios from 'axios'

import * as actionsTypes from './actionsTypes'

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    authData,
  }
}

export const authFail = (error) => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error,
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())

    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-MC64yT3fhV7v5-YdAPnv2_Rt8WuYyyo', authData)
      .then(response => {
        dispatch(authSuccess(response.data))
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message))
      })
  }
}

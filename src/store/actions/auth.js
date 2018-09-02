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
  }
}

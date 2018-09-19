import * as actionsTypes from './actionsTypes'

export const authStart = () => {
  return {type: actionsTypes.AUTH_START}
}

export const authSuccess = (token, userId) => {
  return {type: actionsTypes.AUTH_SUCCESS, token, userId}
}

export const authFail = (error) => {
  return {type: actionsTypes.AUTH_FAIL, error}
}

export const logout = () => {
  return {type: actionsTypes.AUTH_INITIATE_LOGOUT}
}

export const logoutSucceed = () => {
  return {type: actionsTypes.AUTH_LOGOUT}
}

export const checkAuthTimeout = (expirationTime) => {
  return {type: actionsTypes.AUTH_CHECK_TIMEOUT, expirationTime}
}

export const auth = (email, password, isSignUp) => {
  return {type: actionsTypes.AUTH_USER, email, password, isSignUp}
}

export const setRedirectPath = (path) => {
  return {type: actionsTypes.AUTH_SET_REDIRECT_PATH, path}
}

export const authCheckState = () => {
  return {type: actionsTypes.AUTH_CHECK_STATE}
}

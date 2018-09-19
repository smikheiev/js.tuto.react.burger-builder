import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../store/actions/auth'

export function * logout (action) {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  yield put(actions.logoutSucceed())
}

export function * checkAuthTimeout (action) {
  yield delay(action.expirationTime * 1000)
  yield put(actions.logout())
}

export function * authUser (action) {
  yield put(actions.authStart())

  const url = action.isSignUp ?
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC-MC64yT3fhV7v5-YdAPnv2_Rt8WuYyyo' :
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC-MC64yT3fhV7v5-YdAPnv2_Rt8WuYyyo'
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }

  try {
    const response = yield axios.post(url, authData)

    const expirationDate = new Date(Date.now() + response.data.expiresIn * 1000)
    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('userId', response.data.localId)
    localStorage.setItem('expirationDate', expirationDate)
    yield put(actions.authSuccess(response.data.idToken, response.data.localId))
    yield put(actions.checkAuthTimeout(response.data.expiresIn))
  }
  catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function * authCheckState (action) {
  const token = localStorage.getItem('token')
  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else {
      const userId = localStorage.getItem('userId')
      yield put(actions.authSuccess(token, userId))
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - Date.now()) / 1000))
    }
  }
}

import reducer from './auth'
import * as actionsTypes from '../actions/actionsTypes'

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false,
    authRedirectPath: '/',
  }

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should store token after log in', () => {
    const action = {
      type: actionsTypes.AUTH_SUCCESS,
      token: 'some token',
      userId: 'some user id',
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      token: 'some token',
      userId: 'some user id',
    })
  })
})

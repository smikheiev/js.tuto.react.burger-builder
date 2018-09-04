import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START:
      return {
        ...state,
        error: null,
        isLoading: true,
      }
    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        isLoading: false,
      }
    case actionsTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }
    case actionsTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }
    case actionsTypes.AUTH_SET_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      }
    default:
      return state
  }
}

export default reducer

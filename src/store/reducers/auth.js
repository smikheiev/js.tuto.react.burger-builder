import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
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
    default:
      return state
  }
}

export default reducer

import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
  orders: [],
  isLoading: false,
  isPurchasing: false,
  isPurchased: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_INIT:
      return {
        ...state,
        isPurchased: false,
      }
    case actionsTypes.PURCHASE_START:
      return {
        ...state,
        isPurchasing: true,
      }
    case actionsTypes.PURCHASE_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      }
      return {
        ...state,
        isPurchasing: false,
        isPurchased: true,
        orders: [
          ...state.orders,
          newOrder,
        ]
      }
    case actionsTypes.PURCHASE_FAIL:
      return {
        ...state,
        isPurchasing: false,
      }
    case actionsTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoading: true,
      }
    case actionsTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isLoading: false,
      }
    case actionsTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        isLoading: false,
      }
    case actionsTypes.AUTH_LOGOUT:
      return {
        ...state,
        orders: [],
      }
    default:
      return state
  }
}

export default reducer

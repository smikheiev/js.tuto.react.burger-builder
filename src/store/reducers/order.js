import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
  orders: [],
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
    default:
      return state
  }
}

export default reducer

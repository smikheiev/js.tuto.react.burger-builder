import * as actionsTypes from './actionsTypes'
import axios from '../../axios-orders'

export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionsTypes.PURCHASE_SUCCESS,
    orderId,
    orderData,
  }
}

export const purchaseFail = (error) => {
  return {
    type: actionsTypes.PURCHASE_FAIL,
    error,
  }
}

export const purchaseStart = () => {
  return {
    type: actionsTypes.PURCHASE_START,
  }
}

export const purchase = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseStart())

    axios.post('/orders.json', orderData)
      .then(response => {
        const orderId = response.data.name
        dispatch(purchaseSuccess(orderId, orderData))
      })
      .catch(error => {
        dispatch(purchaseFail(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  }
}

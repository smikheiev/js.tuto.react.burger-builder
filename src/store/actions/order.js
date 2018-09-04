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

export const purchase = (orderData, authToken) => {
  return (dispatch) => {
    dispatch(purchaseStart())

    axios.post(`/orders.json?auth=${authToken}`, orderData)
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

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = (authToken, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())

    axios.get(`/orders.json?auth=${authToken}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        const orders = []
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(orders))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}

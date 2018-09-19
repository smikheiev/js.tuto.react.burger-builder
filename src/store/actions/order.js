import * as actionsTypes from './actionsTypes'

export const purchaseSuccess = (orderId, orderData) => {
  return {type: actionsTypes.PURCHASE_SUCCESS, orderId, orderData}
}

export const purchaseFail = (error) => {
  return {type: actionsTypes.PURCHASE_FAIL, error}
}

export const purchaseStart = () => {
  return {type: actionsTypes.PURCHASE_START}
}

export const purchase = (orderData, authToken) => {
  return {type: actionsTypes.PURCHASE, orderData, authToken}
}

export const purchaseInit = () => {
  return {type: actionsTypes.PURCHASE_INIT}
}

export const fetchOrdersSuccess = (orders) => {
  return {type: actionsTypes.FETCH_ORDERS_SUCCESS, orders}
}

export const fetchOrdersFail = (error) => {
  return {type: actionsTypes.FETCH_ORDERS_FAIL, error}
}

export const fetchOrdersStart = () => {
  return {type: actionsTypes.FETCH_ORDERS_START}
}

export const fetchOrders = (authToken, userId) => {
  return {type: actionsTypes.FETCH_ORDERS, authToken, userId}
}

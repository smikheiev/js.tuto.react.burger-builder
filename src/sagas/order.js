import { put } from 'redux-saga/effects'
import axios from '../axios-orders'
import * as actions from '../store/actions/order'

export function * purchase (action) {
  yield put(actions.purchaseStart())

  try {
    const response = yield axios.post(`/orders.json?auth=${action.authToken}`, action.orderData)
    yield put(actions.purchaseSuccess(response.data.name, action.orderData))
  } catch (error) {
    yield put(actions.purchaseFail(error))
  }
}

export function * fetchOrders (action) {
  yield put(actions.fetchOrdersStart())

  try {
    const response = yield axios.get(`/orders.json?auth=${action.authToken}&orderBy="userId"&equalTo="${action.userId}"`)
    const orders = []
    for (let key in response.data) {
      orders.push({
        ...response.data[key],
        id: key,
      })
    }
    yield put(actions.fetchOrdersSuccess(orders))
  }
  catch (error) {
    yield put(actions.fetchOrdersFail(error))
  }
}

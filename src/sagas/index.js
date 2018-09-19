import { all, takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../store/actions/actionsTypes'
import * as authSaga from './auth'
import * as burgerBuilderSaga from './burgerBuilder'
import * as orderSaga from './order'

export function * watchAuth () {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSaga.logout),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSaga.checkAuthTimeout),
    takeEvery(actionTypes.AUTH_USER, authSaga.authUser),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authSaga.authCheckState),
  ])
}

export function * watchBurgerBuilder () {
  yield all([
    takeEvery(actionTypes.INIT_INGREDIENTS, burgerBuilderSaga.initIngredients),
  ])
}

export function * watchOrder () {
  yield all([
    takeEvery(actionTypes.PURCHASE, orderSaga.purchase),
    takeEvery(actionTypes.FETCH_ORDERS, orderSaga.fetchOrders),
  ])
}

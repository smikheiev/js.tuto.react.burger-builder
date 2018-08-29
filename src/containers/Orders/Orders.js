import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import Spinner from '../../components/Ui/Spinner/Spinner'
import * as orderActions from '../../store/actions/order'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders()
  }

  render () {
    let orders = <Spinner/>
    if (!this.props.isLoading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))
    }

    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(orderActions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

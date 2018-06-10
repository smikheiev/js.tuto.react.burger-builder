import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true,
  }

  componentDidMount () {
    axios.get('/orders.json')
      .then(res => {
        const orders = []
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          })
        }
        this.setState({
          isLoading: false,
          orders: orders,
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })
  }

  render () {
    const orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
      />
    ))

    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)

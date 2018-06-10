import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  }

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for (let param of query.entries()) {
      const [key, value] = param
      if (key === 'price') {
        price = value
      } else {
        ingredients[key] = value
      }
    }
    this.setState({
      ingredients: ingredients,
      price: price,
    })
  }

  cancelHandler = () => {
    this.props.history.goBack()
  }

  continueHandler = () => {
    this.props.history.replace('/checkout/contactData')
  }

  render () {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
          continue={this.continueHandler}
        />
        <Route
          path={this.props.match.path + '/contactData'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    )
  }
}

export default Checkout

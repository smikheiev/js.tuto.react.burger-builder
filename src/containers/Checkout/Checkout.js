import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    }
  }

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let param of query.entries()) {
      const [key, value] = param
      ingredients[key] = value
    }
    this.setState({
      ingredients: ingredients,
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
        <Route path={this.props.match.path + '/contactData'} component={ContactData}/>
      </div>
    )
  }
}

export default Checkout

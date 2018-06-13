import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
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
          ingredients={this.props.ingredients}
          cancel={this.cancelHandler}
          continue={this.continueHandler}
        />
        <Route
          path={this.props.match.path + '/contactData'}
          render={(props) => (
            <ContactData
              {...props}
            />
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)

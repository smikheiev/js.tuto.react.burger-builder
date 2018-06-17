import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
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
    let summary
    if (this.props.ingredients) {
      summary = (
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
    } else {
      summary = (
        <Redirect to='/'/>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)

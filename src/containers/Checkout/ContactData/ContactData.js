import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/Ui/Button/Button'
import Spinner from '../../../components/Ui/Spinner/Spinner'
import Input from '../../../components/Ui/Input/Input'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/order'
import { checkValidity } from '../../../shared/validation'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          autoComplete: 'name',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        wasTouched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          autoComplete: 'email',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        wasTouched: false,
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone',
          autoComplete: 'tel',
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 9,
          maxLength: 12,
        },
        isValid: false,
        wasTouched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
          autoComplete: 'address',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        wasTouched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: 'fastest',
      },
    },
    isFormValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    }

    this.props.onOrderBurger(order, this.props.authToken)
  }

  inputChangeHandler = (event, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    }
    const newFormElement = {
      ...newOrderForm[inputId],
    }
    newFormElement.value = event.target.value
    newFormElement.isValid = checkValidity(event.target.value, newFormElement.validationRules)
    newFormElement.wasTouched = true
    newOrderForm[inputId] = newFormElement

    let newIsFormValid = true
    for (let key in newOrderForm) {
      if (newOrderForm[key].validationRules) {
        newIsFormValid = newIsFormValid && newOrderForm[key].isValid
      }
    }

    this.setState({
      orderForm: newOrderForm,
      isFormValid: newIsFormValid,
    })
  }

  render () {
    let form = null
    if (this.props.isPurchasing) {
      form = <Spinner/>
    } else {
      const formElements = []
      for (let key in this.state.orderForm) {
        formElements.push({
          id: key,
          config: this.state.orderForm[key],
        })
      }

      form = (
        <form onSubmit={this.orderHandler}>
          {formElements.map(element => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              isValid={element.config.isValid}
              shouldValidate={!!element.config.validationRules}
              wasTouched={element.config.wasTouched}
              change={(event) => this.inputChangeHandler(event, element.id)}
            />
          ))}
          <Button buttonType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
        </form>
      )
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your contant data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isPurchasing: state.order.isPurchasing,
    authToken: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, authToken) => dispatch(orderActions.purchase(orderData, authToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))

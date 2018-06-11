import React, { Component } from 'react'

import Button from '../../../components/Ui/Button/Button'
import Spinner from '../../../components/Ui/Spinner/Spinner'
import Input from '../../../components/Ui/Input/Input'
import styles from './ContactData.css'
import axios from '../../../axios-orders'

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
        value: 'Serhii Mikheiev',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          autoComplete: 'email',
        },
        value: '',
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone',
          autoComplete: 'tel',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
          autoComplete: 'address',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
        },
        value: '',
      },
    },
    isSendingOrder: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({
      isSendingOrder: true,
    })

    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          isSendingOrder: false,
        })
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({
          isSendingOrder: false,
        })
      })
  }

  inputChangeHandler = (event, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    }
    const newFormElement = {
      ...newOrderForm[inputId],
    }
    newFormElement.value = event.target.value
    newOrderForm[inputId] = newFormElement

    this.setState({
      orderForm: newOrderForm,
    })
  }

  render () {
    let form = null
    if (this.state.isSendingOrder) {
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
              change={(event) => this.inputChangeHandler(event, element.id)}
            />
          ))}
          <Button buttonType='Success'>ORDER</Button>
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

export default ContactData

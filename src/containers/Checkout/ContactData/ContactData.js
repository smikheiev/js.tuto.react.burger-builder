import React, { Component } from 'react'

import Button from '../../../components/Ui/Button/Button'
import Spinner from '../../../components/Ui/Spinner/Spinner'
import styles from './ContactData.css'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    isSendingOrder: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({
      isSendingOrder: true,
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Serhii Mikheiev',
        phone: '123-456-789',
        adress: {
          street: 'some street',
          zipCode: '12-345',
        },
      },
      deliveryMethod: 'fastest',
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

  render () {
    let form = null
    if (this.state.isSendingOrder) {
      form = <Spinner/>
    } else {
      form = (
        <form>
          <input className={styles.Input} type='text' name='name'
                 placeholder='Name' autoComplete='name'/>
          <input className={styles.Input} type='email' name='email'
                 placeholder='Email' autoComplete='email'/>
          <input className={styles.Input} type='text' name='street'
                 placeholder='Street' autoComplete='street-address'/>
          <input className={styles.Input} type='text' name='postal'
                 placeholder='Postal code' autoComplete='postal-code'/>
          <Button buttonType='Success' clicked={this.orderHandler}>ORDER</Button>
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

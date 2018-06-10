import React, { Component } from 'react'

import Button from '../../../components/Ui/Button/Button'
import styles from './ContactData.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  }

  render () {
    return (
      <div className={styles.ContactData}>
        <h4>Enter your contant data</h4>
        <form>
          <input className={styles.Input} type='text' name='name'
                 placeholder='Name' autoComplete='name'/>
          <input className={styles.Input} type='email' name='email'
                 placeholder='Email' autoComplete='email'/>
          <input className={styles.Input} type='text' name='street'
                 placeholder='Street' autoComplete='street-address'/>
          <input className={styles.Input} type='text' name='postal'
                 placeholder='Postal code' autoComplete='postal-code'/>
          <Button btnType='Success'>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default ContactData

import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../Ui/Button/Button'
import styles from './CheckoutSummary.css'

const checkoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tests well!</h1>
      <Burger ingredients={props.ingredients}/>
      <Button
        buttonType='Danger'
        clicked={null}>CANCEL</Button>
      <Button
        buttonType='Success'
        clicked={null}>CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary

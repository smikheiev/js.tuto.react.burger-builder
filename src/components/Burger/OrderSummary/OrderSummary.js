import React from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../Ui/Button/Button'

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map((type) => {
      return (
        <li key={type}>
          <span style={{textTransform: 'capitalize'}}>{type}</span>: {props.ingredients[type]}
        </li>
      )
    })

  return (
    <Aux>
      <h3>Your order:</h3>
      <p>A fantastic burger with the next ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
      <Button buttonType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary

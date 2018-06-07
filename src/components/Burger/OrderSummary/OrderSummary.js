import React from 'react'

import Aux from '../../../hoc/Aux'

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
      <p>Continue to checkout?</p>
    </Aux>
  )
}

export default orderSummary

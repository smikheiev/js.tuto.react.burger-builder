import React from 'react'

import styles from './Order.css'

const order = (props) => {
  const ingredients = []
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key]
    })
  }

  const ingredientsComponents = ingredients.map(ingredient => {
    return <span
      key={ingredient.name}
      className={styles.Ingredient}
    >{ingredient.name} ({ingredient.amount})
    </span>
  })

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsComponents}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order

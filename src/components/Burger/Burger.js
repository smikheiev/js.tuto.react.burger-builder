import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.css'

const burger = (props) => {
  const ingredientTypes = Object.keys(props.ingredients)
  const allIngredientTypes = ingredientTypes.map((type) => {
    const ingredientCount = props.ingredients[type]
    return Array(ingredientCount).fill(type)
  })
  const allIngredientTypesFlattened = allIngredientTypes.reduce((previousValue, currentValue) => {
    return [...previousValue, ...currentValue]
  })
  const ingredientComponents = allIngredientTypesFlattened.map((type, index) => {
    return <BurgerIngredient key={index} type={type}/>
  })

  return (
    <div className={styles.Burger}>
      {ingredientComponents}
    </div>
  )
}

export default burger

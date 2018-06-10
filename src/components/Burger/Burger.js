import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.css'

const burger = (props) => {
  const ingredientTypes = Object.keys(props.ingredients)
  const allIngredientTypes = ingredientTypes.map((type) => {
    const ingredientCount = +(props.ingredients[type])
    return Array(ingredientCount).fill(type)
  })
  const allIngredientTypesFlattened = allIngredientTypes.reduce((previousValue, currentValue) => {
    return [...previousValue, ...currentValue]
  })

  let ingredientComponents = null
  if (allIngredientTypesFlattened.length === 0) {
    ingredientComponents = <p>Add some ingredients</p>
  }
  else {
    ingredientComponents = allIngredientTypesFlattened.map((type, index) => {
      return <BurgerIngredient key={index} type={type}/>
    })
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top'/>
      {ingredientComponents}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  )
}

export default burger

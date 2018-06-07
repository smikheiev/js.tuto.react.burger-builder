import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.css'

const burger = (props) => {
  const types = ['bread-top', 'salad', 'cheese', 'bacon', 'meat', 'bread-bottom']
  const ingredients = types.map((type, index) => <BurgerIngredient key={index} type={type}/>)
  return (
    <div className={styles.Burger}>
      {ingredients}
    </div>
  )
}

export default burger

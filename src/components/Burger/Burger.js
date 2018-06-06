import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
  const types = ['bread-bottom', 'bread-top', 'meat', 'cheese', 'salad', 'bacon',]
  return types.map((type, index) => <BurgerIngredient key={index} type={type}/>)
}

export default Burger

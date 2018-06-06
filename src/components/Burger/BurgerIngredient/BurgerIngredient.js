import React from 'react'

import Aux from '../../../hoc/Aux'
import styles from './BurgerIngredient.css'

const BurgerIngredient = (props) => {
  let className = ''
  let children = null

  switch (props.type) {
    case 'bread-bottom':
      className = styles.BreadBottom
      break
    case 'bread-top':
      className = styles.BreadTop
      children = (
        <Aux>
          <div className={styles.Seeds1}></div>
          <div className={styles.Seeds2}></div>
        </Aux>
      )
      break
    case 'meat':
      className = styles.Meat
      break
    case 'cheese':
      className = styles.Cheese
      break
    case 'salad':
      className = styles.Salad
      break
    case 'bacon':
      className = styles.Bacon
      break
    default:
      return null
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default BurgerIngredient

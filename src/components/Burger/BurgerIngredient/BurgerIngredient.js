import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Aux from '../../../hoc/Aux/Aux'
import styles from './BurgerIngredient.css'

class BurgerIngredient extends Component {
  render () {
    let className = ''
    let children = null

    switch (this.props.type) {
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
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient

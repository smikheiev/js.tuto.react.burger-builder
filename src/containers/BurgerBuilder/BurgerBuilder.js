import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.8,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    isPurchasable: false,
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount + 1
    const newIngredients = {
      ...this.state.ingredients
    }
    newIngredients[type] = newCount

    const oldPrice = this.state.totalPrice
    const addPrice = INGREDIENT_PRICES[type]
    const newPrice = oldPrice + addPrice

    const newIsPurchasable = this.areIngredientsPurchable(newIngredients)

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
      isPurchasable: newIsPurchasable
    })
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const newCount = oldCount - 1
    const newIngredients = {
      ...this.state.ingredients
    }
    newIngredients[type] = newCount

    const oldPrice = this.state.totalPrice
    const deductPrice = INGREDIENT_PRICES[type]
    const newPrice = oldPrice - deductPrice

    const newIsPurchasable = this.areIngredientsPurchable(newIngredients)

    this.setState({
      ingredients: newIngredients,
      totalPrice: newPrice,
      isPurchasable: newIsPurchasable
    })
  }

  areIngredientsPurchable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((acc, value) => acc + value)

    return sum > 0
  }

  render () {
    const disabledInfo = {}
    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0
    }

    return (
      <Aux>
        <div>
          <Burger ingredients={this.state.ingredients}/>
        </div>
        <div>
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            isPurchasable={this.state.isPurchasable}
          />
        </div>
      </Aux>
    )
  }
}

export default BurgerBuilder

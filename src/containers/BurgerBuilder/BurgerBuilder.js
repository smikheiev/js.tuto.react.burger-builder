import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const newCount = oldCount + 1
    const newIngredients = {
      ...this.state.ingredients
    }
    newIngredients[type] = newCount

    this.setState({
      ingredients: newIngredients,
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

    this.setState({
      ingredients: newIngredients,
    })
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
          />
        </div>
      </Aux>
    )
  }
}

export default BurgerBuilder

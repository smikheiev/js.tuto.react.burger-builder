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

  }

  render () {
    return (
      <Aux>
        <div>
          <Burger ingredients={this.state.ingredients}/>
        </div>
        <div>
          <BuildControls addIngredient={this.addIngredientHandler}/>
        </div>
      </Aux>
    )
  }
}

export default BurgerBuilder

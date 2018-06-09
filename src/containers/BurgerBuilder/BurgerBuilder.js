import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/Ui/Modal/Modal'
import Spinner from '../../components/Ui/Spinner/Spinner'
import axios from '../../axios-orders'

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
    isPurchasing: false,
    isLoading: false,
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

  purchaseHandler = () => {
    this.setState({
      isPurchasing: true,
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      isPurchasing: false,
    })
  }

  purchaseContinueHandler = () => {
    this.setState({
      isLoading: true,
    })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Serhii Mikheiev',
        phone: '123-456-789',
        adress: {
          street: 'some street',
          zipCode: '12-345',
        },
      },
      deliveryMethod: 'fastest',
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          isLoading: false,
          isPurchasing: false,
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isPurchasing: false,
        })
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

    let orderSummary = null
    if (this.state.isLoading) {
      orderSummary = <Spinner/>
    } else {
      orderSummary = <OrderSummary
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}/>
    }

    return (
      <Aux>
        <Modal show={this.state.isPurchasing} closeModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          orderClick={this.purchaseHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          isPurchasable={this.state.isPurchasable}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder

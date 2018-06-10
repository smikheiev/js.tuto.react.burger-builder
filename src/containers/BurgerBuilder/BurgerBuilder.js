import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/Ui/Modal/Modal'
import Spinner from '../../components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.8,
  meat: 1.3,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    isPurchasing: false,
    isLoading: false,
    error: null
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(response => {
        const newIngredients = response.data
        this.setState({
          ingredients: newIngredients
        })
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })
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
    const queryParams = []
    for (let i in this.state.ingredients) {
      const key = encodeURIComponent(i)
      const value = encodeURIComponent(this.state.ingredients[i])
      queryParams.push(`${key}=${value}`)
    }
    const queryString = queryParams.join('&')

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
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
    if (this.state.isLoading || !this.state.ingredients) {
      orderSummary = <Spinner/>
    } else {
      orderSummary = <OrderSummary
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}/>
    }

    let burger = null
    if (this.state.ingredients) {
      burger = <Burger ingredients={this.state.ingredients}/>
    } else if (this.state.error) {
      burger = <p>Ingredients can not be loaded</p>
    } else {
      burger = <Spinner/>
    }

    let buildControls = null
    if (this.state.ingredients) {
      buildControls = <BuildControls
        addIngredient={this.addIngredientHandler}
        removeIngredient={this.removeIngredientHandler}
        orderClick={this.purchaseHandler}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        isPurchasable={this.state.isPurchasable}
      />
    } else {
      buildControls = <Spinner/>
    }

    return (
      <Aux>
        <Modal show={this.state.isPurchasing} closeModal={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
        {buildControls}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/Ui/Modal/Modal'
import Spinner from '../../components/Ui/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as burgerBuilderActions from '../../store/actions/burgerBuilder'

class BurgerBuilder extends Component {
  state = {
    isPurchasable: false,
    isPurchasing: false,
  }

  componentDidMount () {
    this.props.onInitIngredients()
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
    this.props.history.push('/checkout')
  }

  areIngredientsPurchable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((acc, value) => acc + value)

    return sum > 0
  }

  render () {
    const disabledInfo = {}
    for (let key in this.props.ingredients) {
      disabledInfo[key] = this.props.ingredients[key] <= 0
    }

    let orderSummary = null
    if (this.state.isLoading || !this.props.ingredients) {
      orderSummary = <Spinner/>
    } else {
      orderSummary = <OrderSummary
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}/>
    }

    let burger = null
    if (this.props.ingredients) {
      burger = <Burger ingredients={this.props.ingredients}/>
    } else if (this.props.error) {
      burger = <p>Ingredients can not be loaded</p>
    } else {
      burger = <Spinner/>
    }

    let buildControls = null
    if (this.props.ingredients) {
      buildControls = <BuildControls
        addIngredient={(type) => this.props.onAddIngredient(type)}
        removeIngredient={(type) => this.props.onRemoveIngredient(type)}
        orderClick={this.purchaseHandler}
        disabled={disabledInfo}
        price={this.props.totalPrice}
        isPurchasable={this.areIngredientsPurchable(this.props.ingredients)}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
    onRemoveIngredient: (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))

import * as actionsTypes from '../actions/actionsTypes'

const initialState = {
  ingredients: null,
  basePrice: 4,
  totalPrice: 0,
  error: false,
}

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.6,
  cheese: 0.8,
  meat: 1.3,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
      }
    case actionsTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
      }
    case actionsTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: state.basePrice + calculateIngredientsPrice(action.ingredients),
        error: false,
      }
    case actionsTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}

const calculateIngredientsPrice = (ingredients) => {
  return Object.keys(ingredients)
    .map((ingredientType) => ingredients[ingredientType] * INGREDIENT_PRICES[ingredientType])
    .reduce((sum, current) => sum + current, 0)
}

export default reducer

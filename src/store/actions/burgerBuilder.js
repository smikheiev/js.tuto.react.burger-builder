import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType
  }
}

export const removeIngredient = (ingredientType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios.get('/ingredients.json')
      .then(response => {
        const newIngredients = response.data
        dispatch(setIngredients(newIngredients))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      })
  }
}

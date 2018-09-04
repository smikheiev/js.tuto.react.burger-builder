import React from 'react'

import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.css'

const controls = [
  {type: 'salad', label: 'Salad'},
  {type: 'bacon', label: 'Bacon'},
  {type: 'cheese', label: 'Cheese'},
  {type: 'meat', label: 'Meat'},
]

const buildControls = (props) => (
  <div className={styles.BuildControl}>
    <p>
      Current price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => {
      return <BuildControl
        key={control.type}
        label={control.label}
        moreClick={() => props.addIngredient(control.type)}
        lessClick={() => props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}
      />
    })}
    <button
      className={styles.OrderButton}
      disabled={!props.isPurchasable}
      onClick={props.orderClick}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
)

export default buildControls

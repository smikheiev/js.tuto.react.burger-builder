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
    {controls.map((control) => {
      return <BuildControl key={control.type} label={control.label}/>
    })}
  </div>
)

export default buildControls

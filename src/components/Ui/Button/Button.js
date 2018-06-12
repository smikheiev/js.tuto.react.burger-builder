import React from 'react'

import styles from './Button.css'

const button = (props) => (
  <button
    className={[styles.Button, styles[props.buttonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}>
    {props.children}
  </button>
)

export default button

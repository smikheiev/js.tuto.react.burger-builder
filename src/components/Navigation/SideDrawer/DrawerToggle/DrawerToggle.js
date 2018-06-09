import React from 'react'

import styles from './DrawerToggle.css'

const drawerToggle = (props) => (
  <div onClick={props.click} className={styles.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle

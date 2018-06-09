import React from 'react'

import styles from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../Ui/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {
  let classes = [styles.SideDrawer]
  if (props.isOpened) {
    classes.push(styles.Open)
  } else {
    classes.push(styles.Close)
  }

  return (
    <Aux>
      <Backdrop show={props.isOpened} click={props.close}/>
      <div className={classes.join(' ')}>
        <div className={styles.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer

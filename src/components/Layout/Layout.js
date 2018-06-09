import React, { Component } from 'react'

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar/>
        <SideDrawer
          isOpened={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout

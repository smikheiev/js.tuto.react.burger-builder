import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Layout.css'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render () {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggleClick={this.sideDrawerToggleClickHandler}/>
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)

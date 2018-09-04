import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as authActions from './store/actions/auth'

class App extends Component {
  componentDidMount () {
    this.props.onTryAuthSignUp()
  }

  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' exact component={Orders}/>
            <Route path='/auth' exact component={Auth}/>
            <Route path='/logout' exact component={Logout}/>
            <Route path='/' exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignUp: () => dispatch(authActions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))

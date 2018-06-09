import React, { Component } from 'react'

import styles from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class modal extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.show !== this.props.show
  }

  render () {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          click={this.props.closeModal}/>
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default modal

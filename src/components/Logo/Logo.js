import React from 'react'

import logoImage from '../../assets/images/burger-logo.png'
import styles from './Logo.css'

const logo = (props) => (
  <div className={styles.Logo}>
    <img src={logoImage} alt='burger'/>
  </div>
)

export default logo
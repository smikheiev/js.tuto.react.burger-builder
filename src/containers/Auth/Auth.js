import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../components/Ui/Input/Input'
import Button from '../../components/Ui/Button/Button'
import styles from './Auth.css'
import * as authActions from '../../store/actions/auth'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          autoComplete: 'email',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        wasTouched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          autoComplete: 'password',
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        wasTouched: false,
      },
    },
    isFormValid: false,
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }

  checkValidity = (value, rules) => {
    if (!rules) {
      return true
    }

    let isValid = true
    if (rules.required) {
      isValid = isValid && value.trim().length > 0
    }
    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength
    }
    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength
    }

    return isValid
  }

  inputChangeHandler = (event, controlId) => {
    const newControls = {
      ...this.state.controls,
      [controlId]: {
        ...this.state.controls[controlId],
        value: event.target.value,
        isValid: this.checkValidity(event.target.value, this.state.controls[controlId].validationRules),
        wasTouched: true,
      }
    }

    let newIsFormValid = true
    for (let key in newControls) {
      if (newControls[key].validationRules) {
        newIsFormValid = newIsFormValid && newControls[key].isValid
      }
    }

    this.setState({
      controls: newControls,
      isFormValid: newIsFormValid,
    })
  }

  render () {
    const formElements = []
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = (
      <form onSubmit={this.submitHandler}>
        {formElements.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            isValid={element.config.isValid}
            shouldValidate={!!element.config.validationRules}
            wasTouched={element.config.wasTouched}
            change={(event) => this.inputChangeHandler(event, element.id)}
          />
        ))}
        <Button buttonType='Success' disabled={!this.state.isFormValid}>SUBMIT</Button>
      </form>
    )

    return (
      <div className={styles.Auth}>
        {form}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(authActions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth)

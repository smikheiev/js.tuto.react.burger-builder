import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/Ui/Input/Input'
import Button from '../../components/Ui/Button/Button'
import Spinner from '../../components/Ui/Spinner/Spinner'
import styles from './Auth.css'
import * as authActions from '../../store/actions/auth'
import { checkValidity } from '../../shared/validation'

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
    isInSignUpMode: true,
  }

  componentDidMount () {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath('/')
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isInSignUpMode)
  }

  inputChangeHandler = (event, controlId) => {
    const newControls = {
      ...this.state.controls,
      [controlId]: {
        ...this.state.controls[controlId],
        value: event.target.value,
        isValid: checkValidity(event.target.value, this.state.controls[controlId].validationRules),
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

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isInSignUpMode: !prevState.isInSignUpMode}
    })
  }

  render () {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath}/>
    }

    let form = null
    if (this.props.isLoading) {
      form = <Spinner/>
    } else {
      const formElements = []
      for (let key in this.state.controls) {
        formElements.push({
          id: key,
          config: this.state.controls[key],
        })
      }

      form = (
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
          <Button buttonType='Success'
                  disabled={!this.state.isFormValid}>{this.state.isInSignUpMode ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </form>
      )
    }

    let errorMessage = null
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    return (
      <div className={styles.Auth}>
        {errorMessage}
        {form}
        <Button buttonType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isInSignUpMode ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(authActions.setRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

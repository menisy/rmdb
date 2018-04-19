import React, { Component } from 'react'
import LoginForm from '../components/Login/LoginForm'

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }


  handleSignIn = (email, password) => {
    this.props.onSignIn(email, password)
  }

  handleFocus = () => {
    this.setState({
      transitionIn: false,
      notification: ''
    })
  }

  render() {

    return (
      <div className="d-flex navbar-dark">
        <LoginForm onSignIn={this.handleSignIn}
                   onFocus={this.handleFocus}/>
      </div>
    )
  }
}

export default LoginContainer

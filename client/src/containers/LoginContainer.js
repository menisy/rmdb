import React, { Component } from 'react'
import Notification from '../components/shared/Notification'
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
{/*        <Notification in={this.state.transitionIn}
                      notification={this.state.notification}
                      color={this.state.notifColor} />*/}
        <LoginForm onSignIn={this.handleSignIn}
                   onFocus={this.handleFocus}/>
      </div>
    )
  }
}

export default LoginContainer

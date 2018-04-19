import React, { Component } from 'react'
import Notification from '../components/shared/Notification'
import LoginForm from '../components/Login/LoginForm'
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }


  handleLogin = (email, password) => {
    const { signInUser } = this.props
    signInUser({ email, password })
    .catch(error => {
      this.setState({ transitionIn: true,
                      notification: 'Invalid Credentials',
                      notifColor: 'red'})
      console.log(error)
    })
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
        <LoginForm onLogin={this.handleLogin}
                   onFocus={this.handleFocus}/>
      </div>
    )
  }
}

export default connect(
  null,
  { signInUser },
)(LoginContainer)

import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Notification from '../shared/Notification'
import headerDefaults from '../../headerDefaults'
import LoginForm from './LoginForm'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transitionIn: false,
      notification: '',
      notifColor: 'red'
    }
    this.setUserData = this.setUserData.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  setUserData = () => {
    const context = this
    // set axios default headers to include auth token
    headerDefaults.setHeader(axios)
    axios.get('/users/me')
      .then(function (response) {
        // Call the props onSignIn to set parent's state
        context.props.onSignIn(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  handleLogin = (email, password) => {
    axios.post( '/user_token', { auth: {email, password} })
    .then(response => {
      // save token in localStore
      localStorage.setItem('jwtToken', response.data.jwt)
      // make another call to fetch user data
      this.setUserData()})
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
      <div className="d-flex">
        <Notification in={this.state.transitionIn}
                      notification={this.state.notification}
                      color={this.state.notifColor} />
        <LoginForm onLogin={this.handleLogin}
                   onFocus={this.handleFocus}/>
      </div>
    )
  }
}

export default LoginContainer

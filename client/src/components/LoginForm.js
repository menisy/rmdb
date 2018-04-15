import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import Notification from './Notification'
import headerDefaults from '../headerDefaults'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transitionIn: false,
      notification: '',
      notifColor: 'red'
    }
  }

  setUserData = (context) => {
    // set axios default headers to include auth token
    headerDefaults.setHeader(axios)
    axios.get('/users/me')
      .then(function (response) {
        // save user data in localStorage
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("email", response.data.email)
        context.props.successSignIn(true)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  handleSubmit = (e) => {
    const email = $('#email').val()
    const password = $('#password').val()
    e.preventDefault()
    axios.post(
      '/user_token',
      { auth: {email: email, password: password }}
    ).then(response => {
      // save token in localStore
      localStorage.setItem("jwtToken", response.data.jwt)
      // make another call to fetch user data
      this.setUserData(this)
    }).catch(error => {
      this.setState({transitionIn: true, notification: 'Invalid Credentials', notifColor: 'red'})
      console.log(error)
    })
  }

  handleFocus = (e) => {
    this.setState({transitionIn: false, notifClass: 'alert-danger'})
  }

  render() {

    return (
      <div className="d-flex">
        <Notification in={this.state.transitionIn} notification={this.state.notification} color={this.state.notifColor} />
        <form className="form-inline " onFocus={this.handleFocus} onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="email" id="email" placeholder="email" aria-label="Email"></input>
          <input className="form-control mr-sm-2" type="password" id= "password" placeholder="password" aria-label="Password"></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
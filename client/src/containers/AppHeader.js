import React, { Component } from 'react';
import LoginContainer from '../components/Login/LoginContainer'
import UserNav from '../components/shared/UserNav'
import Notification from '../components/shared/Notification'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { connect } from 'react-redux'
import { signInUser, signOutUser } from '../redux-token-auth-config'
import { fetchMoviesStart } from '../actions/movies-actions'
import notificationsActions from '../actions/notifications-actions'
import logo from '../logo.svg'

class AppHeader extends Component {

  constructor(props){
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleHideNotification = this.handleHideNotification.bind(this)
  }

  handleSignIn = (email, password) => {
    const { signInUser, showNotification, hideNotification, fetchMovies } = this.props
    hideNotification()
    signInUser({ email, password })
    .then(response => {
      fetchMovies()
    })
    .catch((error) => {
      showNotification(
        error.response.data.errors,
        'danger'
        )
    })
  }

  handleSignOut = () => {
    const context = this
    const { signOutUser } = this.props
    signOutUser()
    .then(response => {
      context.props.fetchMovies()
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleHideNotification = () => {
    this.props.hideNotification()
  }

  render(){
    let userArea
    const { isSignedIn, attributes } = this.props.currentUser
    const { messages, color, transition} = this.props.notification
    if(!isSignedIn){
      userArea = <LoginContainer onSignIn={ this.handleSignIn }/>
    }else if(isSignedIn){
      userArea = <UserNav attributes={ attributes }
                          onSignOut={ this.handleSignOut }/>
    }

    return (
      <div>
        <LoadingSpinner/>
        <div className="alert-wrapper my-2 mw-100">
          <Notification in={transition}
                        onHide={this.handleHideNotification}
                        notification={messages}
                        color={color}/>
        </div>
        <nav className="navbar navbar-expand-lg
                        fixed-top navbar-dark
                        bg-dark justify-content-between">
          <div className="container">
            <a className="" href="#home">
              <img src={logo} className="app-logo d-inline-block mb-2" alt="logo"/>
            </a>
            <h3 className="text-white">ReactMovieDB</h3>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#topNavBar"
                    aria-controls="topNavBar"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-dark navbar-collapse"
                 id="topNavBar">
              <div className="navbar-nav mr-auto mt-2 mt-lg-0">
              </div>
              {userArea}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const mapSTateToProps = (state) => {
  return {
    notification: state.notification,
    currentUser: state.reduxTokenAuth.currentUser,
  }
}

const bindActionsToDispatch = ({
      signInUser: signInUser,
      signOutUser: signOutUser,
      showNotification: notificationsActions.showNotification,
      hideNotification: notificationsActions.hideNotification,
      fetchMovies: fetchMoviesStart
  })

export default connect(
  mapSTateToProps,
  bindActionsToDispatch,
)(AppHeader)
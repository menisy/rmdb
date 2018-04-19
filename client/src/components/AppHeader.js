import React, { Component } from 'react';
import LoginContainer from '../containers/LoginContainer'
import UserNav from './shared/UserNav'
import { connect } from 'react-redux'
import { signInUser, signOutUser } from '../redux-token-auth-config'
import { fetchMovies } from '../actions/movies-actions'

class AppHeader extends Component {

  constructor(props){
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignIn = (email, password) => {
    const { signInUser } = this.props
    const context = this
    signInUser({ email, password })
    .then(response => {
      context.props.fetchMovies()
    })
    .catch(error => {
      console.log(error)
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

  render(){
    let userArea
    const { isSignedIn, isLoading, attributes } = this.props.currentUser
    if(!isSignedIn && !isLoading){
      userArea = <LoginContainer onSignIn={this.handleSignIn}/>
    }else if(isSignedIn){
      userArea = <UserNav attributes={ attributes }
                          onSignOut={this.handleSignOut}/>
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg
                        fixed-top navbar-dark
                        bg-dark justify-content-between">
          <div className="container">
            <a className="navbar-brand mt-2" href="#">
              <h3>ReactMovieDB</h3>
            </a>
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

export default connect(
  null,
  { signInUser, signOutUser, fetchMovies },
)(AppHeader)
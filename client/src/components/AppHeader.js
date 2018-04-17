import React, { Component } from 'react';
import LoginContainer from './Login/LoginContainer'
import UserNav from './shared/UserNav'

class AppHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signedIn: this.props.userData.signedIn,
      username: this.props.userData.username,
      email: this.props.userData.email
    }
    this.handleSuccessSignIn = this.handleSuccessSignIn.bind(this)
  }

  handleSuccessSignIn(userData){
    this.props.onSignIn(userData)
  }

  render(){
    let userArea
    if(!this.props.signedIn){
      userArea = <LoginContainer onSignIn={this.handleSuccessSignIn} />
    }else{
      userArea = <UserNav username={this.props.userData.username} />
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg
                        fixed-top navbar-light
                        bg-light justify-content-between">
          <div className="container">
            <a className="navbar-brand" href="#">
              <h3>ReactMovieDB</h3>
            </a>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse"
                 id="navbarTogglerDemo02">
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

export default AppHeader
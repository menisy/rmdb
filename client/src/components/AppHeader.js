import React, { Component } from 'react';
import LoginContainer from '../containers/LoginContainer'
import UserNav from './shared/UserNav'

class AppHeader extends Component {

  render(){
    let userArea
    const { isSignedIn, isLoading, attributes } = this.props.currentUser
    if(!isSignedIn && !isLoading){
      userArea = <LoginContainer/>
    }else if(isSignedIn){
      userArea = <UserNav attributes={ attributes } />
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

export default AppHeader
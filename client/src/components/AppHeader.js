import React, { Component } from 'react';
import LoginForm from './LoginForm'
import UserNav from './UserNav'

class AppHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signedIn: this.props.signedIn,
      username: localStorage.getItem('username')
    }
  }

  handleSuccessSignIn(status){
    if(status){
      this.props.setSignedIn(true)
      this.setState({signedIn: true, username: localStorage.getItem('username')})
    }
  }

  render(){
    var loginForm
    if(!this.props.signedIn){
      loginForm = <LoginForm successSignIn={this.handleSuccessSignIn.bind(this)} />
    }else{
      loginForm = <UserNav username={this.state.username} />
    }
    loginForm = <UserNav username="Sayed" />

    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light justify-content-between">
          <div className="container">
            <a className="navbar-brand" href="#"><h3>ReactMovieDB</h3></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>
              {loginForm}
            </div>
          </div>
        </nav>
      </div>
    )
  }

}

export default AppHeader
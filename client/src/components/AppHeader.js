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

    return (
      <div>
        <nav className="navbar fixed-top navbar-light bg-light justify-content-between">
          <div className="container">
            <h1 className="jumbotron-heading">R<small>eact</small>
               M<small>ovie</small>
               DB</h1>
            {loginForm}
          </div>
        </nav>
      </div>
    )
  }

}

export default AppHeader
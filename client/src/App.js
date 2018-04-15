import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import AppHeader from './components/AppHeader'
import MoviesContainer from './components/MoviesContainer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signedIn: this.checkForToken()
    }
    axios.defaults.baseURL = 'http://localhost:3001/api/v1'
  }

  checkForToken = () => {
    if(localStorage.getItem("jwtToken")){
      return true
    }else{
      return false
    }
  }

  setSignedIn = (status) => {
    this.setState({signedIn: status})
  }

  render() {
    return (
      <div className="app">
        <div>
          <AppHeader signedIn={this.state.signedIn} setSignedIn={this.setSignedIn}/>
        </div>
        <div>
          <MoviesContainer/>
        </div>
      </div>
    );
  }
}

export default App
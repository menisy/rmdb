import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import AppHeader from './components/AppHeader'
import MoviesContainer from './containers/MoviesContainer'
import FilterGroup from './containers/FilterGroup'
import { connect } from 'react-redux'
import moviesActions from './actions/movies-actions'

class App extends Component {
  constructor(props) {
    super(props)
    // Set axios defaults
    axios.defaults.baseURL = 'http://localhost:3001/api/v1'
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwtToken')
  }

  render() {
    return (
      <div>
        <div className="app">
          <div>
            <AppHeader userData={false}
                       signedIn={false}
                       onSignIn={this.setSignedIn}/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-lg-2">
                <FilterGroup/>
              </div>
              <div className="col-md-9 col-lg-10">
                <MoviesContainer/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  }
}

const bindActionsToDispatch = ({
      onSetSearchText:  moviesActions.setSearchText,
      fetchMovies: moviesActions.fetchMovies
  })

export default connect(mapStateToProps, bindActionsToDispatch)(App)



















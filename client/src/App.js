import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import AppHeader from './containers/AppHeader'
import MoviesContainer from './containers/MoviesContainer'
import FilterGroup from './containers/FilterGroup'
import { connect } from 'react-redux'
import moviesActions from './actions/movies-actions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="app">
          <div>
            <AppHeader/>
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
    auth: state.reduxTokenAuth
  }
}

const bindActionsToDispatch = ({
      onSetSearchText:  moviesActions.setSearchText,
      fetchMovies: moviesActions.fetchMovies
  })

export default connect(mapStateToProps, bindActionsToDispatch)(App)

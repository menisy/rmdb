import React, { Component } from 'react'
import './App.css'
import AppHeader from './containers/AppHeader'
import MoviesContainer from './containers/MoviesContainer'
import FilterGroup from './containers/FilterGroup'

class App extends Component {
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


export default App

import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import AppHeader from './components/AppHeader'
import MoviesContainer from './components/Movie/MoviesContainer'
import FilterGroup from './components/Filter/FilterGroup'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signedIn: this.checkForToken(),
      movies: [],
      activeCategory: '',
      activeRating: '',
      searchQuery: '',
      myMovies: false
    }
    axios.defaults.baseURL = 'http://localhost:3001/api/v1'
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken')
  }

  checkForToken = () => {
    if(localStorage.getItem("jwtToken")){
      return true
    }else{
      return false
    }
  }

  setSignedIn = (status) => {
    this.setState({signedIn: status}, (status) => {
      // Reset axios header to include the new token
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken')
    })
  }

  fetchMovies = () => {
    const rating = this.state.activeRating
    const category = this.state.activeCategory
    const searchQuery = this.state.searchQuery
    const myMovies = this.state.myMovies
    axios.get(`/movies?category_id=${category}&rating=${rating}&text=${searchQuery}&mine=${myMovies}`, {
      params: {
        sort_by: this.state.sortBy
      }
    })
    .then(response => {
      this.setState({movies: response.data})
    })
    .catch(error => console.log(error))
  }

  setRating = (rating) => {
    this.setState({activeRating: rating}, () => this.fetchMovies())
  }

  setCategory = (category) => {
    this.setState({activeCategory: category}, () => this.fetchMovies())
  }

  setSearch = (searchQuery, myMovies = false) => {
    this.setState({searchQuery: searchQuery, myMovies: myMovies}, () => this.fetchMovies())
  }
  setMovies = (movies) => {
    this.setState({movies: movies})
  }
  render() {
    return (
      <div>
        <div className="app">
          <div>
            <AppHeader signedIn={this.state.signedIn} setSignedIn={this.setSignedIn}/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <FilterGroup moviesCount={this.state.movies.length} 
                  setCategory={this.setCategory}
                  setRating={this.setRating}/>
              </div>
              <div className="col-md-9">
                <MoviesContainer movies={this.state.movies}
                  setSearch={this.setSearch} signedIn={this.state.signedIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App

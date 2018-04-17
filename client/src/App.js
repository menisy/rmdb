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
      username: '',
      email: '',
      id: '',
      movies: [],
      activeCategory: '',
      activeRating: '',
      searchQuery: '',
      myMovies: false
    }
    this.setSignedIn = this.setSignedIn.bind(this)
    this.fetchMovies = this.fetchMovies.bind(this)
    this.checkForToken = this.checkForToken.bind(this)
    this.setMyMovies = this.setMyMovies.bind(this)
    // Set axios defaults
    axios.defaults.baseURL = 'http://localhost:3001/api/v1'
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwtToken')
  }


  componentDidMount = () => {
    if(this.checkForToken()){
      const context = this
      axios.get('/users/me')
        .then(function (response) {
          const {username, email, id} = response.data
          const signedIn = true
          context.setState({username, email, id, signedIn})
        })
        .catch(function (error) {
          console.log(error)
      });
    }
  }

  checkForToken = () => {
    if(localStorage.getItem("jwtToken")){
      return true
    }else{
      return false
    }
  }

  setSignedIn = (userData) => {
    const {email, username, id} = userData
    const signedIn = true
    const token = 'Bearer ' + localStorage.getItem('jwtToken')
    // Set userId in local Storage
    localStorage.setItem('userId', id)
    this.setState({email, username, id, signedIn}, () => {
          // Reset axios default headers to include the new token
          axios.defaults.headers.common['Authorization'] = token
        })
  }

  fetchMovies = () => {
    const rating = this.state.activeRating
    const category = this.state.activeCategory
    const searchQuery = this.state.searchQuery
    const myMovies = this.state.myMovies
    axios.get(`/movies`,
                {
                  params: {
                    sort_by: this.state.sortBy,
                    text: searchQuery,
                    rating: rating,
                    category_id: category,
                    mine: myMovies
                  }
                }
              )
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
    this.setState({searchQuery}, () => this.fetchMovies())
  }

  setMyMovies = (myMovies = false) => {
    this.setState({myMovies}, () => this.fetchMovies())
  }

  setMovies = (movies) => {
    this.setState({movies: movies})
  }
  render() {
    const {signedIn, username, email} = this.state
    const userData = {signedIn, username, email}
    console.log(userData)
    return (
      <div>
        <div className="app">
          <div>
            <AppHeader userData={userData}
                       signedIn={this.state.signedIn}
                       onSignIn={this.setSignedIn}/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-lg-2">
                <FilterGroup moviesCount={this.state.movies.length}
                             setCategory={this.setCategory}
                             setRating={this.setRating}
                             setMyMovies={this.setMyMovies}
                             signedIn={this.state.signedIn}
                  />
              </div>
              <div className="col-md-9 col-lg-10">
                <MoviesContainer movies={this.state.movies}
                                 setSearch={this.setSearch}
                                 signedIn={this.state.signedIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App

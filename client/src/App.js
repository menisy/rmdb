import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import AppHeader from './components/AppHeader'
import MoviesContainer from './containers/MoviesContainer'
import FilterGroup from './components/Filter/FilterGroup'
import { connect } from 'react-redux'
import moviesActions from './actions/movies-actions'

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
    this.checkForToken = this.checkForToken.bind(this)
    this.setMyMovies = this.setMyMovies.bind(this)
    this.setCategory = this.setCategory.bind(this)
    this.setRating = this.setRating.bind(this)
    // Set axios defaults
    axios.defaults.baseURL = 'http://localhost:3001/api/v1'
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('jwtToken')
  }


  // componentDidMount = () => {
  //   if(this.checkForToken()){
  //     const context = this
  //     axios.get('/users/me')
  //       .then(function (response) {
  //         const {username, email, id} = response.data
  //         const signedIn = true
  //         context.setState({username, email, id, signedIn})
  //       })
  //       .catch(function (error) {
  //         console.log(error)
  //     });
  //   }
  // }

  // componentWillMount = () => {
  //   this.props.fetchMovies()
  // }

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

  // fetchMovies = () => {
  //   const rating = this.state.activeRating
  //   const category = this.state.activeCategory
  //   const searchQuery = this.state.searchQuery
  //   const myMovies = this.state.myMovies
  //   axios.get('/movies',
  //               {
  //                 params: {
  //                   sort_by: this.state.sortBy,
  //                   text: searchQuery,
  //                   rating: rating,
  //                   category_id: category,
  //                   mine: myMovies
  //                 }
  //               }
  //             )
  //   .then(response => {
  //     this.setState({movies: response.data})
  //   })
  //   .catch(error => console.log(error))
  // }

  setRating = (rating) => {
    this.setState({activeRating: rating})
  }

  setCategory = (category) => {
    this.setState({activeCategory: category})
  }

  setMyMovies = (myMovies = false) => {
    this.setState({myMovies})
  }

  setMovies = (movies) => {
    this.setState({movies: movies})
  }

  render() {
    const {signedIn, username, email} = this.state
    const userData = {signedIn, username, email}
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
                <FilterGroup setCategory={this.setCategory}
                             setRating={this.setRating}
                             setMyMovies={this.setMyMovies}
                             signedIn={this.state.signedIn}
                  />
              </div>
              <div className="col-md-9 col-lg-10">
                <MoviesContainer signedIn={this.state.signedIn}
                                 userId={this.state.id}
                                 rating={this.state.activeRating}
                                 category={this.state.activeCategory}
                                 myMovies={this.state.myMovies}
                                  />
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





















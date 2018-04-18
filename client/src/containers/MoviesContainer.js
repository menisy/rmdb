import React, { Component } from 'react'
import axios from 'axios'
import Movie from '../components/Movie/Movie'
import MovieForm from '../components/Movie/MovieForm'
import Notification from '../components/shared/Notification'
import SearchForm from '../components/Search/SearchForm'
import headerDefaults from '../headerDefaults'
import MoviesList from '../components/Movie/MoviesList'

import { connect } from 'react-redux'
import moviesActions from '../actions/movies-actions'
import LoadingSpinner from '../components/shared/LoadingSpinner'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)

    this.addNewMovie = this.addNewMovie.bind(this)
    this.updateMovie = this.updateMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.resetNotification = this.resetNotification.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.changeSort = this.changeSort.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount = () => {
    this.props.fetchMovies()
  }

  setSearch = (searchQuery, myMovies = false) => {
    this.setState({searchQuery}, () => this.fetchMovies())
  }

  addNewMovie = (movie) => {
    axios.post('/movies', {movie: {title: '', body: ''}})
    .then(response => {
      this.setState({
        movies: [response.data, ...this.state.movies],
        editingMovieId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  updateMovie = (movie) => {
    const { movies } = this.state
    this.setState({
      movies: movies.map(x => x.id === movie.id ? movie : x),
      notification: 'All changes saved',
      transitionIn: true
    })
  }

  deleteMovie = (id) => {
    headerDefaults.setHeader(axios)
    axios.delete(`/movies/${id}`)
    .then(response => {
      this.setState({
        movies: this.state.movies.filter(x => x.id !== id)
      })
    }).catch((error, response) => console.log([error, response]))
  }



  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingMovieId: id}, () => { this.title.focus() })
  }

  changeSort = (value) => {
    this.setState({sortBy: value}, () => this.fetchMovies())
  }

  handleSearch = (searchQuery) => {
    this.setState({searchQuery: searchQuery}, () => this.setSearch(searchQuery))
  }

  render() {
    // const { editingMovieId, notification, transitionIn, sortBy } = this.state
    // const movies = this.props.movies.movies
    // console.log(movies)
    return (
      <div className="mt-xs-2">
        <div className="position-fixed">
          {/*<Notification in={transitionIn} notification={notification}/>*/}
        </div>
        <nav className="nav nav-fill justify-content-end form-inline">
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        <LoadingSpinner isLoading={this.props.isLoading}/>
        <MoviesList movies={this.props.movies.movies}
                    signedIn={this.props.signedIn}
                    rateMovie={this.props.rateMovie}/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    isSignedIn: true,
    isLoading: state.movies.isLoading
  }
}

const bindActionsToDispatch = ({
      fetchMovies: moviesActions.fetchMovies,
      rateMovie: moviesActions.rateMovie
  })

export default connect(mapStateToProps, bindActionsToDispatch)(MoviesContainer)


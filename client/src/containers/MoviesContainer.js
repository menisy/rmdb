import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import MoviesList from '../components/Movie/MoviesList'
import Movie from '../components/Movie/Movie'
import MovieForm from '../components/Movie/MovieForm'
import Notification from '../components/shared/Notification'
import SearchForm from '../components/Search/SearchForm'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import moviesActions from '../actions/movies-actions'
import emptyMovie from '../components/Movie/emptyMovie'
import Button from '../components/shared/Button'
import $ from 'jquery'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)

    this.addNewMovie = this.addNewMovie.bind(this)
    this.editMovie = this.editMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.submitMovie = this.submitMovie.bind(this)
    this.resetNotification = this.resetNotification.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchMovies()
  }

  setSearch = (searchQuery, myMovies = false) => {
    this.setState({searchQuery}, () => this.fetchMovies())
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
    this.props.deleteMovie(id)
  }

  addNewMovie = (movie) => {
    this.props.newMovie()
    $('#movieFormModal').modal('show')
  }

  submitMovie = (movie) => {
    console.log('herreee')
    console.log(movie)
    this.props.setEditingMovie(movie)
    this.props.submitMovie()
  }

  editMovie = (movie) => {
    this.props.editMovie(movie)
    $('#movieFormModal').modal('show')
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  changeSort = (value) => {
    this.setState({sortBy: value}, () => this.fetchMovies())
  }

  handleSearch = (searchQuery) => {
    if(searchQuery.trim().length > 0){
      this.props.searchMovies(searchQuery)
    }
  }

  checkShowModal(){
    if(this.props.movies.showModal){
      $('#movieFormModal').modal('show')
    }else{
      $('#movieFormModal').modal('hide')
    }
  }

  render() {
    // check to see if we need to display the movie modal
    this.checkShowModal()

    const { currentUser, rateMovie } = this.props
    const { movies, isLoading, editingMovie } = this.props.movies
    let newMovieButton, formMovie, formTitle

    if(currentUser.isSignedIn){
      newMovieButton = <Button title="Add a new movie"
                               onToggle={this.addNewMovie}
                               isActive={true}
                               color="btn-success mr-2 my-2 w-5" />
    }

    if(editingMovie.id){
      formMovie = movies.filter( movie => {return movie.id == editingMovie.id} )[0]
      formTitle = 'Edit your movie'
    }else{
      formMovie = emptyMovie
      formTitle = 'Create a new movie'
    }

    return (
      <div className="mt-xs-2">
        <div className="position-fixed">
          {/*<Notification in={transitionIn} notification={notification}/>*/}
        </div>
        <nav className="nav nav-fill justify-content-end form-inline">
          {newMovieButton}
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        <LoadingSpinner isLoading={isLoading}/>
        <MovieForm  onSubmit={this.submitMovie}/>
        <MoviesList movies={movies}
                    currentUser={currentUser}
                    rateMovie={rateMovie}
                    isLoading={isLoading}
                    onEditMovie={this.editMovie}
                    onDeleteMovie={this.deleteMovie}
                    />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    currentUser: state.reduxTokenAuth.currentUser,
  }
}

const bindActionsToDispatch = ({
      fetchMovies: moviesActions.fetchMovies,
      rateMovie: moviesActions.rateMovie,
      searchMovies: moviesActions.searchMovies,
      editMovie: moviesActions.editMovie,
      newMovie: moviesActions.newMovie,
      deleteMovie: moviesActions.deleteMovie,
      submitMovie: moviesActions.submitMovie,
      setEditingMovie: moviesActions.setEditingMovie
  })

export default connect(mapStateToProps, bindActionsToDispatch)(MoviesContainer)


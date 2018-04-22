import React, { Component } from 'react'
import { connect } from 'react-redux'
import MoviesList from '../components/Movie/MoviesList'
import MovieForm from '../components/Movie/MovieForm'
import SearchForm from '../components/Search/SearchForm'
import moviesActions from '../actions/movies-actions'
import Button from '../components/shared/Button'
import $ from 'jquery'
import Pagination from '../components/Movie/Pagination';


class MoviesContainer extends Component {
  constructor(props) {
    super(props)

    this.addNewMovie = this.addNewMovie.bind(this)
    this.editMovie = this.editMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.submitMovie = this.submitMovie.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchMovies()
  }

  deleteMovie = (id) => {
    this.props.deleteMovie(id)
  }

  addNewMovie = (movie) => {
    this.props.newMovie()
    $('#movieFormModal').modal('show')
  }

  submitMovie = (movie) => {
    this.props.setEditingMovie(movie)
    this.props.submitMovie()
  }

  dismissModal = () => {
    this.props.dismissModal()
  }

  editMovie = (movie) => {
    this.props.editMovie(movie)
    $('#movieFormModal').modal('show')
  }

  handleSearch = (searchQuery) => {
    this.props.searchMovies(searchQuery)
  }

  handlePageClick = (page) => {
    // increment 1 because here is 0 based
    // backend is 1 based
    this.props.changePage(page.selected + 1)
  }

  checkShowModal = () => {
    if(this.props.movies.showModal){
      $('#movieFormModal').modal('show')
    }else{
      $('#movieFormModal').modal('hide')
    }
  }

  render() {

    // check to see if we need to display form modal
    this.checkShowModal()

    const { currentUser, rateMovie } = this.props
    const { movies, isLoading } = this.props.movies
    let newMovieButton

    if(currentUser.isSignedIn){
      newMovieButton = <Button title="Add a new movie"
                               onToggle={this.addNewMovie}
                               isactive={true}
                               color={" btn-success mr-md-2 mr-xs-0 my-2 w-5 w-sm-100"}
                               icon={"plus"}/>
    }

    return (
      <div className="mt-xs-2">
        <nav className="nav nav-fill justify-content-end form-inline">
          {newMovieButton}
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        <MovieForm  onSubmit={this.submitMovie}
                    onDismiss={this.dismissModal}/>
        <Pagination movies={this.props.movies}
                    onPageChange={this.handlePageClick}
                    isLoading={this.isLoading}
                    isErrored={this.isErrored}/>
        <MoviesList movies={movies}
                    currentUser={currentUser}
                    rateMovie={rateMovie}
                    isLoading={isLoading}
                    isErrored={this.isErrored}
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
      fetchMovies: moviesActions.fetchMoviesStart,
      rateMovie: moviesActions.rateMovieStart,
      searchMovies: moviesActions.searchMovies,
      editMovie: moviesActions.editMovie,
      newMovie: moviesActions.newMovie,
      deleteMovie: moviesActions.deleteMovieStart,
      submitMovie: moviesActions.submitMovieStart,
      setEditingMovie: moviesActions.setEditingMovie,
      changePage: moviesActions.changePage,
      dismissModal: moviesActions.dismissModal,
  })

export default connect(mapStateToProps, bindActionsToDispatch)(MoviesContainer)


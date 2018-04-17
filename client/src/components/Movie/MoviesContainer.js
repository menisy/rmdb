import React, { Component } from 'react'
import axios from 'axios'
import MoviesList from './MoviesList'
import MovieForm from './MovieForm'
import Notification from '../shared/Notification'
import SearchForm from '../Search/SearchForm'
import Sort from '../Sort'
import headerDefaults from '../../headerDefaults'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editingMovieId: null,
      notification: '',
      transitionIn: false,
      sortBy: 'createdAt',
      searchQuery: '',
      allMoviesActive: true,
      userMoviesActive: false
    }
  }

  componentDidMount() {
    this.props.setSearch('')
  }

  addNewMovie = (movie) => {
    axios.post('/movies', {movie: {title: '', body: ''}})
    .then(response => {
      this.setState({
        movies: [response.data, ...this.props.movies],
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
        movies: this.props.movies.filter(x => x.id !== id)
      })
    }).catch((error, response) => console.log([error, response]))
  }

  resetNotification = () => {this.setState({notification: '', transitionIn: false})}

  enableEditing = (id) => {
    this.setState({editingMovieId: id}, () => { this.title.focus() })
  }

  changeSort = (value) => {
    this.setState({sortBy: value}, () => this.props.fetchMovies())
  }

  handleSearch = (searchQuery) => {
    this.setState({searchQuery: searchQuery}, () => this.props.setSearch(searchQuery))
  }

  render() {
    const { editingMovieId, notification, transitionIn, sortBy } = this.state
    const movies = this.props.movies
    return (
      <div className="mt-xs-2">
        <div className="position-fixed">
          <Notification in={transitionIn} notification={notification}/>
        </div>
        <nav className="nav nav-fill justify-content-end form-inline">
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        <MoviesList movies={movies}
                    onSearch={this.handleSearch}
                    resetNotifiction={this.resetNotification}
                    onNewMovie={this.addNewMovie}
                    onEnableEditing={this.enableEditing}
                    onUpdateMovie={this.updateMovie}
                    onDeleteMovie={this.deleteMovie}/>
      </div>
    );
  }
}

export default MoviesContainer
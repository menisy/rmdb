import React, { Component } from 'react'
import axios from 'axios'
import Movie from './Movie'
import MovieForm from './MovieForm'
import Notification from '../Notification'
import SearchForm from '../Search/SearchForm'
import Sort from '../Sort'
import headerDefaults from '../../headerDefaults'
import Button from '../Button'

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

  addNewMovie = () => {
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

  handleUserMoviesClick = () => {
    // Call searchQuery prop with mine set to true
    this.setState({userMoviesActive: true, allMoviesActive: false},
      () => this.props.setSearch(this.state.searchQuery, true))
  }

  handleAllMoviesClick = () => {
    // Call searchQuery prop with mine set to false
    this.setState({allMoviesActive: true, userMoviesActive: false},
      () => this.props.setSearch(this.state.searchQuery, false))
  }

  render() {
    const { editingMovieId, notification, transitionIn, sortBy } = this.state
    const movies = this.props.movies
    var userButton = null
    if(this.props.signedIn){
      userButton = <Button title="Your Movies" handleClick={this.handleUserMoviesClick}
                      isActive={this.state.userMoviesActive}/>
    }

    return (
      <div className="mt-xs-2">
        <div className="position-fixed">
          <Notification in={transitionIn} notification={notification}/>
        </div>
        <nav className="nav nav-fill justify-content-end form-inline">
          <Button title="All Movies" handleClick={this.handleAllMoviesClick}
            isActive={this.state.allMoviesActive}/>
          {userButton}
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        {movies.map(movie => {
          if(editingMovieId === movie.id) {
            return (<MovieForm key={movie.id} movie={movie}
                      titleRef={input => this.title = input}
                      updateMovie={this.updateMovie}
                      resetNotification={this.resetNotification} />)
          } else {
            return (<Movie key={movie.id} movie={movie}
                      onClick={this.enableEditing}
                      onDelete={this.deleteMovie} />)
          }
        })}
      </div>
    );
  }
}

export default MoviesContainer
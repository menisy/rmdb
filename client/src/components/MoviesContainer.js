import React, { Component } from 'react'
import axios from 'axios'
import Movie from './Movie'
import MovieForm from './MovieForm'
import Notification from './Notification'
import Sort from './Sort'
import headerDefaults from '../headerDefaults'

class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    const { movie } = this.props

    this.state = {
      editingMovieId: null,
      notification: '',
      transitionIn: false,
      sortBy: 'createdAt'
    }
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = () => {
    axios.get('/movies', {
      params: {
        sort_by: this.state.sortBy
      }
    })
    .then(response => {
      this.props.setMovies(response.data)
    })
    .catch(error => console.log(error))
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
    this.setState({sortBy: value}, () => this.fetchMovies())
  }

  render() {
    const { editingMovieId, notification, transitionIn, sortBy } = this.state
    const movies = this.props.movies

    return (
      <div>
        <div>
          <Notification in={transitionIn} notification={notification} />
        </div>
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
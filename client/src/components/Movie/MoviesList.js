import React, { Component } from 'react'
import axios from 'axios'
import Movie from './Movie'
import MovieForm from './MovieForm'
import Notification from '../shared/Notification'
import SearchForm from '../Search/SearchForm'
import Sort from '../Sort'
import headerDefaults from '../../headerDefaults'
import Button from '../shared/Button'

class MoviesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editingMovieId: null,
    }
  }


  newMovie = (movie) => {
    this.props.onNewMovie(movie)
  }

  updateMovie = (movie) => {
    this.props.onUpdateMovie(movie)
  }

  deleteMovie = (id) => {
    this.props.onDeleteMovie(id)
  }

  resetNotification = () => {
    this.props.resetNotification({notification: '', transitionIn: false})
  }

  enableEditing = (id) => {
    this.props.onEnableEditing(id)
  }

  handleSearch = (searchQuery) => {
    this.props.onSearch(searchQuery)
  }


  render() {
    const { editingMovieId } = this.state
    const movies = this.props.movies

    return (
      <div className="mt-xs-2">
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

export default MoviesList
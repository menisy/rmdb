import React, { Component } from 'react'
import axios from 'axios'
import Movie from './Movie'
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
      userMoviesActive: false,
      movies: []
    }

    this.addNewMovie = this.addNewMovie.bind(this)
    this.updateMovie = this.updateMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.resetNotification = this.resetNotification.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    this.changeSort = this.changeSort.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.fetchMovies = this.fetchMovies.bind(this)
  }

  componentDidMount() {
    console.log('mounted')
    this.fetchMovies()
  }

  shouldComponentUpdate = () => {
    return true
  }

  fetchMovies = () => {
    const rating = this.props.activeRating
    const category = this.props.activeCategory
    const searchQuery = this.state.searchQuery
    const myMovies = this.state.myMovies
    axios.get('/movies',
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
    console.log('rendered')
    const { editingMovieId, notification, transitionIn, sortBy } = this.state
    const movies = this.state.movies
    return (
      <div className="mt-xs-2">
        <div className="position-fixed">
          <Notification in={transitionIn} notification={notification}/>
        </div>
        <nav className="nav nav-fill justify-content-end form-inline">
          <SearchForm handleSearch={this.handleSearch}/>
        </nav>
        <div className="mt-xs-2 row">
        {movies.map(movie => {
          if(editingMovieId === movie.id) {
            return (<MovieForm key={movie.id} movie={movie}
                      titleRef={input => this.title = input}
                      updateMovie={this.updateMovie}
                      resetNotification={this.resetNotification} />)
          } else {
            return (<Movie key={movie.id} movie={movie}
                      onClick={this.enableEditing}
                      onDelete={this.deleteMovie}
                      onRating={this.rateMovie}
                      signedIn={this.props.signedIn}
                      />)
          }
        })}
      </div>
      </div>
    );
  }
}

export default MoviesContainer
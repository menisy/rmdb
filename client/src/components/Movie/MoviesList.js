import React, { Component } from 'react'
import MovieItem from './MovieItem'

class MoviesList extends Component {
  constructor(props) {
    super(props)

    this.newMovie = this.newMovie.bind(this)
    this.rateMovie = this.rateMovie.bind(this)
    this.editMovie = this.editMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
  }

  componentDidMount = () => {
    this.setState({
      movies: this.props.movies
    })
  }


  newMovie = (movie) => {
    this.props.onNewMovie(movie)
  }

  updateMovie = (movie) => {
    this.props.onUpdateMovie(movie)
  }

  rateMovie = (id, rating) => {
    this.props.onRatingMovie(id, rating)
  }

  editMovie = (id) => {
    this.props.onEditMovie(id)
  }

  deleteMovie = (id) => {
    this.props.onDeleteMovie(id)
  }


  render() {
    const movies = this.props.movies
    const { currentUser } = this.props
    const userId = currentUser.attributes.id

    let emptyMsg

    if(movies.length === 0 && !this.props.isLoading){
      emptyMsg = <h5 className="mt-2">
                  <i className="far fa-frown frowny"/>
                  ops! No movies here, try changing the search query or reset the filters.
                  </h5>
    }

    return (
      <div className="mt-xs-2 row">
        {movies.map(movie => {
            return (<MovieItem key={movie.id} movie={movie}
                      onEdit={this.editMovie}
                      onDelete={this.deleteMovie}
                      editable={movie.user_id === userId}
                      rateMovie={this.props.rateMovie}
                      currentUser={currentUser}
                      />)
        })}
        <div className="empty-msg col-12 text-center">
          {emptyMsg}
        </div>
      </div>
    );
  }
}

export default MoviesList
import axios from 'axios'
import TYPES from '../shared/movie-action-types'
import updateAuthHeaders from '../shared/util/updateAuthHeaders'
import { showNotification } from './notifications-actions'
import emptyMovie from '../components/Movie/emptyMovie'


const setSearchQuery = (query) => {
  return {
    type: TYPES.SET_SEARCH_QUERY,
    payload: query
  }
}

const setMyMovies = (myMoviesBool) => {
  return {
    type: TYPES.SET_MY_MOVIES,
    payload: myMoviesBool
  }
}

const setCategoryFilter = (category_id) => {
  return {
    type: TYPES.SET_CATEGORY_FILTER,
    payload: category_id
  }
}

const setRatingFilter = (rating) => {
  return {
    type: TYPES.SET_RATING_FILTER,
    payload: rating
  }
}

const rateMovieSuccess = (ratingMovie) => {
  return {
    type: TYPES.RATE_MOVIE_SUCCESS,
    payload: ratingMovie
  }
}

const setLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  }
}

const setShowModal = (bool) => {
  return {
    type: TYPES.SET_SHOW_MODAL,
    payload: bool
  }
}

const moviesIsLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  }
}

const moviesErrored = (msg) => {
  return {
    type: TYPES.MOVIES_FETCH_ERROR,
    payload: {alert: { message: msg, color: 'danger' }}
  }
}

const moviesFetchSuccess = (movies) => {
  return {
    type: TYPES.MOVIES_FETCH_SUCCESS,
    payload: movies
  }
}

const categoriesFetchSuccess = (categories) => {
  return {
    type: TYPES.CATEGORIES_FETCH_SUCCESS,
    payload: categories
  }
}

const ratingsFetchSuccess = (ratings) => {
  return {
    type: TYPES.RATINGS_FETCH_SUCCESS,
    payload: ratings
  }
}

const setEditingMovie = (movie) => {
  return {
    type: TYPES.SET_EDITING_MOVIE,
    payload: movie
  }
}

const editMovie = (movie) => {
  return dispatch => {
    dispatch(setEditingMovie(movie))
    dispatch(setShowModal(true))
  }
}

const newMovie = () => {
  return dispatch => {
    dispatch(setEditingMovie(emptyMovie))
    dispatch(setShowModal(true))
  }
}

const submitMovie = () => {
  return (dispatch, getState) => {
    const { editingMovie } = getState().movies
    if(editingMovie.id){
      dispatch(updateMovie(editingMovie))
    }else{
      dispatch(createMovie(editingMovie))
    }
  }
}

const updateMovie = (movie) => {
  return (dispatch, getState) => {
    updateAuthHeaders()
    // Remove id from movie since it's rejected by
    // backend's permit param
    let {id, ...safeMovie} = movie
    axios.put(`/movies/${movie.id}`,
                {
                    movie: safeMovie
                })
      .then(response => {
        dispatch(setEditingMovie(emptyMovie))
        dispatch(setShowModal(false))
        dispatch(fetchMovies())
        dispatch(
          showNotification('Movie updated successfully',
                            'success'))
      })
      .catch((error) => {
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}

const deleteMovie = (movieId) => {
  return dispatch => {
    updateAuthHeaders()
    // Remove id from movie since it's rejected by
    // backend's permit param
    axios.delete(`/movies/${movieId}`)
      .then(response => {
        dispatch(fetchMovies())
        dispatch(
          showNotification('Movie deleted successfully',
                            'success'))
      })
      .catch((error) => {
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}

const createMovie = (movie) => {
  return (dispatch, getState) => {
    updateAuthHeaders()
    // Remove id from movie since it's rejected by
    // backend's permit param
    let {id, ...safeMovie} = movie
    axios.post('/movies',
                {
                    movie: safeMovie
                })
      .then(response => {
        dispatch(setEditingMovie(emptyMovie))
        dispatch(setShowModal(false))
        dispatch(fetchMovies())
        dispatch(
          showNotification('Movie created successfully',
                            'success'))
      })
      .catch((error) => {
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}

export const fetchMovies = () => {
  return (dispatch, getState) => {
    const { searchQuery, categoryFilter, ratingFilter, myMovies } = getState().movies
    dispatch(setLoading(true))
    updateAuthHeaders()
    axios.get('/movies',{
                  params: {
                    text: searchQuery,
                    rating: ratingFilter,
                    category_id: categoryFilter,
                    mine: myMovies
                  }
                })
      .then(response => {
        dispatch(setLoading(false))
        dispatch(moviesFetchSuccess(response.data))
      })
      .catch((error) => {
        dispatch(setLoading(false))
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}

const fetchCategories = () => {
  return dispatch => {
    axios.get('/categories')
      .then(response => {
        dispatch(categoriesFetchSuccess(response.data))
      })
      .catch((error) => {
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}

const fetchRatings = () => {
  return dispatch => {
    axios.get('/ratings/movies_count')
      .then(response => {
        dispatch(ratingsFetchSuccess(response.data))
      })
      .catch((error) => {
        dispatch(
          showNotification(error.response.data,
                            'danger'))
      })
  }
}



const filterByCategory = (category_id) => {
  return dispatch => {
    dispatch(setCategoryFilter(category_id))
    dispatch(fetchMovies())
  }
}

const filterByRating = (rating) => {
  return dispatch => {
    dispatch(setRatingFilter(rating))
    dispatch(fetchMovies())
  }
}

const searchMovies = (query) => {
  return dispatch => {
    dispatch(setSearchQuery(query))
    dispatch(fetchMovies())
  }
}

const toggleMyMovies = (myMovies) => {
  return dispatch => {
    dispatch(setMyMovies(myMovies))
    dispatch(fetchMovies())
  }
}

const rateMovie = (id, rating) => {
  return dispatch => {
    axios.post('/ratings',
                  {
                    rating:{
                      movie_id: id,
                      rate: rating
                    }
                  }
      )
      .then(response => {
        dispatch(fetchMovies())
      }).catch((error) => console.log([error]))
  }
}

const moviesActions = {
  moviesIsLoading,
  moviesErrored,
  moviesFetchSuccess,
  setLoading,
  fetchMovies,
  rateMovie,
  filterByCategory,
  filterByRating,
  fetchCategories,
  fetchRatings,
  searchMovies,
  toggleMyMovies,
  editMovie,
  newMovie,
  submitMovie,
  setEditingMovie,
  deleteMovie
}

export default moviesActions
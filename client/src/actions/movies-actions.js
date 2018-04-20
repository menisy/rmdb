import TYPES from '../shared/movie-action-types'
import { showNotification } from './notifications-actions'
import emptyMovie from '../components/Movie/emptyMovie'
import moviesServices from '../services/movies-services'

// Plain actions
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

const setSubmitting = (submitting) => {
  return {
    type: TYPES.SET_SUBMITTING,
    payload: submitting
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

export const setLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  }
}

export const setShowModal = (bool) => {
  return {
    type: TYPES.SET_SHOW_MODAL,
    payload: bool
  }
}

const moviesFetchSuccess = (movies) => {
  return {
    type: TYPES.MOVIES_FETCH_SUCCESS,
    payload: movies
  }
}

export const categoriesFetchSuccess = (categories) => {
  return {
    type: TYPES.CATEGORIES_FETCH_SUCCESS,
    payload: categories
  }
}

export const ratingsFetchSuccess = (ratings) => {
  return {
    type: TYPES.RATINGS_FETCH_SUCCESS,
    payload: ratings
  }
}

export const setEditingMovie = (movie) => {
  return {
    type: TYPES.SET_EDITING_MOVIE,
    payload: movie
  }
}

const setPage = (page) => {
  return {
    type: TYPES.SET_PAGE,
    payload: page
  }
}

export const setAllCount = (allCount) => {
  return {
    type: TYPES.SET_ALL_COUNT,
    payload: allCount
  }
}

export const setPages = (pages) => {
  return {
    type: TYPES.SET_PAGES,
    payload: pages
  }
}

const setFetshingMovies = (bool) => {
  return {
    type: TYPES.FETCHING_MOVIES,
    payload: bool
  }
}

// Dispatchers

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

const resetToDefaults = (alertText, alertColor='success') => {
  return dispatch => {
    dispatch(setEditingMovie(emptyMovie))
    dispatch(setSubmitting(false))
    dispatch(setLoading(false))
    dispatch(setShowModal(false))
    dispatch(fetchMoviesStart())
    dispatch(fetchCategoriesStart())
    dispatch(
      showNotification(alertText, alertColor))
  }
}

const showError = (errors) => {
  return dispatch => {
    dispatch(setSubmitting(false))
    dispatch(setLoading(false))
    dispatch(
      showNotification(errors.response.data,
                        'danger'))
  }
}

const dismissModal = () => {
  return dispatch => {
    dispatch(setShowModal(false))
  }
}


const filterByCategory = (category_id) => {
  return dispatch => {
    dispatch(setPage(1))
    dispatch(setCategoryFilter(category_id))
    dispatch(fetchMoviesStart())
  }
}

const filterByRating = (rating) => {
  return dispatch => {
    dispatch(setPage(1))
    dispatch(setRatingFilter(rating))
    dispatch(fetchMoviesStart())
  }
}

const searchMovies = (query) => {
  return (dispatch, getState) => {
    dispatch(setPage(1))
    dispatch(setSearchQuery(query))
    dispatch(setPage(1))
    dispatch(fetchMoviesStart())
  }
}

const toggleMyMovies = (myMovies) => {
  return dispatch => {
    dispatch(setPage(1))
    dispatch(setMyMovies(myMovies))
    dispatch(fetchMoviesStart())
  }
}

const changePage = (selected) => {
  return dispatch => {
    dispatch(setPage(selected))
    dispatch(fetchMoviesStart())
  }
}


// Service consumers

const deleteMovieStart = (movideId) => {
  return dispatch => {
    moviesServices.deleteMovie(movideId)
    .then(()=>{
      dispatch(fetchMoviesStart())
      dispatch(fetchCategoriesStart())
      dispatch(fetchRatingsStart())
      dispatch(
          showNotification('Movie deleted successfully',
                            'success'))
    })
  }
}

const submitMovieStart = () => {
  return (dispatch, getState) => {
    dispatch(setLoading(true))
    // handle multi submit
    if(!getState().movies.submittingMovie){
      dispatch(setSubmitting(true))
      const { editingMovie } = getState().movies
      if(editingMovie.id){
        moviesServices.updateMovie(editingMovie)
        .then(() => dispatch(resetToDefaults('Movie updated successfully')))
        .catch((error) => dispatch(showError(error)))
        } else {
        moviesServices.createMovie(editingMovie)
        .then(() => dispatch(resetToDefaults('Movie created successfully')))
        .catch((error) => dispatch(showError(error)))
      }
    }
  }
}

export const fetchMoviesStart = () => {
  return (dispatch, getState) => {
    const movies = getState().movies
    console.log(movies)
    dispatch(setFetshingMovies(true))
    dispatch(setLoading(true))
    moviesServices.fetchMovies(movies)
    .then((response) => {
      dispatch(setPages(response.data.pagination.pages))
      dispatch(moviesFetchSuccess(response.data.movies))
      dispatch(setAllCount(response.data.pagination.all_count))
      dispatch(setFetshingMovies(false))
      dispatch(setLoading(false))
    })
    .catch((error)=> {
      dispatch(setLoading(false))
      dispatch(
          showNotification(error.response.data,
                            'danger'))
    })
  }
}

export const fetchCategoriesStart = () => {
  return dispatch => {
    moviesServices.fetchCategories()
    .then((response) => {
      dispatch(categoriesFetchSuccess(response.data))
    })
    .catch((error)=> {
      dispatch(
          showNotification(error.response.data,
                            'danger'))
    })
  }
}

export const fetchRatingsStart = () => {
  return dispatch => {
    moviesServices.fetchRatings()
    .then((response) => {
      dispatch(ratingsFetchSuccess(response.data))
    })
    .catch((error)=> {
      dispatch(
          showNotification(error.response.data,
                            'danger'))
    })
  }
}

export const rateMovieStart = (id, rating) => {
  return dispatch => {
    dispatch(setLoading(true))
    moviesServices.rateMovie(id, rating)
    .then((response) => {
      dispatch(fetchMoviesStart())
      dispatch(fetchRatingsStart())
    })
    .catch((error)=> {
      dispatch(
          showNotification(error.response.data,
                            'danger'))
    })
  }
}

const moviesActions = {
  fetchMoviesStart,
  filterByCategory,
  filterByRating,
  fetchCategoriesStart,
  fetchRatingsStart,
  toggleMyMovies,
  newMovie,
  editMovie,
  rateMovieStart,
  searchMovies,
  deleteMovieStart,
  submitMovieStart,
  setEditingMovie,
  changePage,
  dismissModal,
}


export default moviesActions
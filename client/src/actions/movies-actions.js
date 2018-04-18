import axios from 'axios'
import headerDefaults from '../headerDefaults'

import TYPES from '../shared/movie-action-types'

const moviesIsLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  };
}

const moviesErrored = (msg) => {
  return {
    type: TYPES.MOVIES_FETCH_ERROR,
    payload: {alert: { message: msg, color: 'danger' }}
  };
}

const moviesFetchSuccess = (movies) => {
  return {
    type: TYPES.MOVIES_FETCH_SUCCESS,
    payload: movies
  };
}

const setSearchText = (text) => {
  return {
    type: TYPES.SET_SEARCH_TEXT,
    payload: text
  };
}

const rateMovieSuccess = (ratingMovie) => {
  return {
    type: TYPES.RATE_MOVIE_SUCCESS,
    payload: ratingMovie
  };
}

const setLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  };
}

const fetchMovies = () => {
  return dispatch => {
    dispatch(setLoading(true))
    axios.get('/movies')
      .then(response => {
        dispatch(setLoading(false))
        dispatch(moviesFetchSuccess(response.data))
      })
      .catch(error => console.log(error))
  }
}

const rateMovie = (id, rating) => {
  return dispatch => {
    headerDefaults.setHeader(axios)
    axios.post('/ratings/',
                  {
                    rating:{
                      movie_id: id,
                      rate: rating
                    }
                  }
      )
      .then(response => {
        dispatch(fetchMovies())
      }).catch((error, response) => console.log([error, response]))
  }
}

const moviesActions = {
  moviesIsLoading,
  moviesErrored,
  moviesFetchSuccess,
  setSearchText,
  setLoading,
  fetchMovies,
  rateMovie
}

export default moviesActions
import axios from 'axios'

import TYPES from '../shared/movie-action-types'

const moviesIsLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: {moviesIsLoading: isLoading}
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

const fetchMovies = () => {
  return dispatch => {
    axios.get('/movies')
      .then(response => {
        dispatch(moviesFetchSuccess(response.data))
      })
      .catch(error => console.log(error))
  }
}

const moviesActions = {
  moviesIsLoading,
  moviesErrored,
  moviesFetchSuccess,
  setSearchText,
  fetchMovies
}

export default moviesActions
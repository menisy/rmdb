import axios from 'axios'
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

const categoriesFetchSuccess = (categories) => {
  return {
    type: TYPES.CATEGORIES_FETCH_SUCCESS,
    payload: categories
  };
}

const ratingsFetchSuccess = (ratings) => {
  return {
    type: TYPES.RATINGS_FETCH_SUCCESS,
    payload: ratings
  };
}

const setSearchQuery = (query) => {
  return {
    type: TYPES.SET_SEARCH_QUERY,
    payload: query
  };
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
  };
}

const setLoading = (isLoading) => {
  return {
    type: TYPES.SET_LOADING,
    payload: isLoading
  };
}

const fetchMovies = () => {
  return (dispatch, getState) => {
    const { searchQuery, categoryFilter, ratingFilter } = getState().movies
    dispatch(setLoading(true))
    axios.get('/movies',{
                  params: {
                    text: searchQuery,
                    rating: ratingFilter,
                    category_id: categoryFilter,
                    mine: false
                  }
                })
      .then(response => {
        dispatch(setLoading(false))
        dispatch(moviesFetchSuccess(response.data))
      })
      .catch(error => console.log(error))
  }
}

const fetchCategories = () => {
  return dispatch => {
    axios.get('/categories')
      .then(response => {
        dispatch(categoriesFetchSuccess(response.data))
      })
      .catch(error => console.log(error))
  }
}

const fetchRatings = () => {
  return dispatch => {
    axios.get('/ratings/movies_count')
      .then(response => {
        dispatch(ratingsFetchSuccess(response.data))
      })
      .catch(error => console.log(error))
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

const rateMovie = (id, rating) => {
  return dispatch => {
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
  setLoading,
  fetchMovies,
  rateMovie,
  filterByCategory,
  filterByRating,
  fetchCategories,
  fetchRatings,
  searchMovies
}

export default moviesActions
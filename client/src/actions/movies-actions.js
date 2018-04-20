import axios from 'axios'
import TYPES from '../shared/movie-action-types'
import { showNotification } from './notifications-actions'
import emptyMovie from '../components/Movie/emptyMovie'


const updateAuthHeaders = () => {
  axios.defaults.headers.common = {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'uid': localStorage.getItem('uid')
  }
  axios.defaults.headers.post = {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'uid': localStorage.getItem('uid')
  }
}

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

const setPage = (page) => {
  return {
    type: TYPES.SET_PAGE,
    payload: page
  }
}

const setAllCount = (allCount) => {
  return {
    type: TYPES.SET_ALL_COUNT,
    payload: allCount
  }
}

const setPages = (pages) => {
  return {
    type: TYPES.SET_PAGES,
    payload: pages
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
    console.log(axios.defaults.headers.common)
    const { editingMovie } = getState().movies
    if(editingMovie.id){
      dispatch(updateMovie(editingMovie))
    }else{
      dispatch(createMovie(editingMovie))
    }
  }
}

const dismissModal = () => {
  return dispatch => {
    dispatch(setShowModal(false))
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
        dispatch(fetchCategories())
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

const updateMovie = (movie) => {
  return (dispatch, getState) => {
    const headers = updateAuthHeaders.authHeaders
    // Remove id from movie since it's rejected by
    // backend's permit param
    let {id, ...safeMovie} = movie
    axios.put(`/movies/${movie.id}`,
                {
                    movie: safeMovie
                },
                {headers: { ...headers}})
      .then(response => {
        dispatch(setEditingMovie(emptyMovie))
        dispatch(setShowModal(false))
        dispatch(fetchMovies())
        dispatch(fetchCategories())
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
          dispatch(fetchCategories())
          dispatch(fetchRatings())
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
    const { searchQuery, categoryFilter,
             ratingFilter, myMovies, page, per } = getState().movies
    dispatch(setLoading(true))
    updateAuthHeaders()
    axios.get('/movies',{
                  params: {
                    text: searchQuery,
                    rating: ratingFilter,
                    category_id: categoryFilter,
                    mine: myMovies,
                    page: page,
                    per: per,
                  }
                })
      .then(response => {
        dispatch(setLoading(false))
        dispatch(setPages(response.data.pagination.pages))
        dispatch(setAllCount(response.data.pagination.all_count))
        dispatch(moviesFetchSuccess(response.data.movies))
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
    dispatch(setPage(1))
    dispatch(fetchMovies())
  }
}

const toggleMyMovies = (myMovies) => {
  return dispatch => {
    dispatch(setMyMovies(myMovies))
    dispatch(fetchMovies())
  }
}

const changePage = (selected) => {
  return dispatch => {
    dispatch(setPage(selected))
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
        dispatch(fetchRatings())
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
  deleteMovie,
  changePage,
  dismissModal,
}

export default moviesActions
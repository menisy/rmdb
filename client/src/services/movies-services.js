import axios from 'axios'

// Set axios base url endpoint according to env
axios.defaults.baseURL = process.env.REACT_APP_API_PATH

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

export const rateMovie = (id, rating) => {
  return axios.post('/ratings',
                  {
                    rating:{
                      movie_id: id,
                      rate: rating
                    }
                  }
      )
      .then(response => {
        return response
      }).catch((error) => console.log([error]))
}

export const createMovie = (movie) => {
  updateAuthHeaders()
  // Remove id from movie since it's rejected by
  // backend's permit param
  let {id, ...safeMovie} = movie
  return axios.post('/movies',
                {
                    movie: safeMovie
                })
        .then(response => {
          return response
        })
        .catch((error) => {
          // throw the error to the consumer
          // function
          throw error
        })
}

export const updateMovie = (movie) => {
  updateAuthHeaders()
  // Remove id from movie since it's rejected by
  // backend's permit param
  let {id, ...safeMovie} = movie
  return axios.put(`/movies/${movie.id}`,
                {
                    movie: safeMovie
                })
        .then(response => {
          return response
        })
        .catch((error) => {
          // throw the error to the consumer
          // function
          throw error
        })
}

export const deleteMovie = (movieId) => {
  updateAuthHeaders()
  return axios.delete(`/movies/${movieId}`)
        .then(response => {
          return response
        })
        .catch((error) => {
          // throw the error to the consumer
          // function
          throw error
        })
}


export const fetchMovies = (getState) => {
  const { searchQuery, categoryFilter,
           ratingFilter, myMovies, page, per } = getState
  updateAuthHeaders()
  return axios.get('/movies',{
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
            return response
          })
          .catch((error) => {
            // throw the error to the consumer
            // function
            throw error
          })
}

export const fetchCategories = () => {
  return axios.get('/categories')
          .then(response => {
            return response
          })
          .catch((error) => {
            console.log(error)
          })
}

export const fetchRatings = () => {
  return axios.get('/ratings/movies_count')
          .then(response => {
            return response
          })
          .catch((error) => {
            console.log(error)
          })
}

const moviesServices = {
  fetchMovies,
  updateMovie,
  rateMovie,
  createMovie,
  deleteMovie,
  fetchCategories,
  fetchRatings,
}

export default moviesServices
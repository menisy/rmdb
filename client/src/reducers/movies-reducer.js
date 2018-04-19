import TYPES from '../shared/movie-action-types'
const initialState = {
  movies: [],
  categories: [],
  ratings: [],
  alert: {},
  isLoading: false,
  isError: false,
  ratingMovie: false,
  searchQuery: '',
  categoryFilter: '',
  ratingFilter: '',
  myMovies: false,
}

const moviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.MOVIES_FETCH_SUCCESS:
      return { ...state, movies: payload };
    case TYPES.MOVIES_FETCH_ERROR:
      return { ...state, alert: payload.alert };
    case TYPES.SET_SEARCH_QUERY:
      return { ...state, searchQuery: payload };
    case TYPES.SET_MY_MOVIES:
      return { ...state, myMovies: payload };
    case TYPES.SET_LOADING:
      return { ...state, isLoading: payload };
    case TYPES.SET_RATING_FILTER:
      return { ...state, ratingFilter: payload };
    case TYPES.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: payload };
    case TYPES.CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: payload };
    case TYPES.RATINGS_FETCH_SUCCESS:
      return { ...state, ratings: payload };
    default:
      return state;
  }
};

export default moviesReducer;

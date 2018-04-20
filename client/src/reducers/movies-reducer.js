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
  all_count: 0,
  page: 1,
  per: 12,
  pages: 0,
  submittingMovie: false,
  editingMovie: {
    title: '',
    description: '',
    id: null,
    category_id: null,
  },
  showModal: false,
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
    case TYPES.SET_EDITING_MOVIE:
      return { ...state, editingMovie: payload };
    case TYPES.SET_PAGE:
      return { ...state, page: payload };
    case TYPES.SET_PAGES:
      return { ...state, pages: payload };
    case TYPES.SET_ALL_COUNT:
      return { ...state, all_count: payload };
    case TYPES.SET_SUBMITTING:
      return {...state, submittingMovie: payload};
    case TYPES.SET_MOVIE_SUBMITTED:
      return { ...state, editingMovie: payload };
    case TYPES.SET_SHOW_MODAL:
      return { ...state, showModal: payload };
    default:
      return state;
  }
};

export default moviesReducer;

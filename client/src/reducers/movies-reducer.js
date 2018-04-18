import TYPES from '../shared/movie-action-types'

const initialState = {
  movies: [],
  alert: {},
  searchText: '',
  isLoading: false,
  signedIn: true
}

const moviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.MOVIES_FETCH_SUCCESS:
      return { ...state, movies: payload };
    case TYPES.MOVIES_FETCH_ERROR:
      return { ...state, alert: payload.alert };
    case TYPES.SET_SEARCH_TEXT:
      return { ...state, searchText: payload };
    case TYPES.SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};

export default moviesReducer;

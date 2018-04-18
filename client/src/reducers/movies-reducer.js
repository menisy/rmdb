const initialState = {
  movies: [],
  alert: {},
  searchText: '',
  isLoading: false
}

const moviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MOVIES_FETCH_SUCCESS':
      return { ...state, movies: payload.movies };
    case 'MOVIES_FETCH_ERROR':
      return { ...state, alert: payload.alert };
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: payload };
    case 'SET_LOADING':
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};

export default moviesReducer;

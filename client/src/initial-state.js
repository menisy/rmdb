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
    reduxTokenAuth: {
      currentUser: {
        isLoading: false,
        isSignedIn: false,
        attributes: {
        username: null
        },
      },
    },
  }

export default initialState;

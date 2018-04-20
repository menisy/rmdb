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
    editingMovie: {
      title: '',
      description: '',
      id: null,
      category_id: null,
    },
    showModal: false,

    reduxTokenAuth: {
      currentUser: {
        isLoading: false,
        isSignedIn: false,
        attributes: {
        username: null
        },
      },
    },

    notification: {
      messages: [],
      color: '',
      transition: false
    }
  }

export default initialState;

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
    submittingMovie: false,
    editingMovie: {
      title: '',
      description: '',
      id: null,
      category_id: null,
    },
    all_count: 0,
    page: 1,
    per: 12,
    pages: 0,
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

const moviesIsLoading = (bool) => {
    return {
        type: 'SET_LOADING',
        payload: {moviesIsLoading: bool}
    };
}

const moviesErrored = (msg) => {
    return {
        type: 'MOVIES_FETCH_ERROR',
        payload: {alert: { message: msg, color: 'danger' }}
    };
}

const moviesFetchSuccess = (movies) => {
    return {
        type: 'MOVIES_FETCH_SUCCESS',
        payload: movies
    };
}

export const setSearchText = (text) => {
    return {
        type: 'SET_SEARCH_TEXT',
        payload: text
    };
}

const moviesActions = {
  moviesIsLoading,
  moviesErrored,
  moviesFetchSuccess,
  setSearchText
}

export default moviesActions
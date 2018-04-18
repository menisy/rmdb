import createConstantObject from './lib/createConstantObject';

const TYPES = createConstantObject(
  'SET_SEARCH_QUERY',
  'SET_LOADING',
  'MOVIES_FETCH_ERROR',
  'MOVIES_FETCH_SUCCESS',
  'SET_CATEGORY_FILTER',
  'SET_RATING_FILTER',
  'CATEGORIES_FETCH_SUCCESS',
  'RATINGS_FETCH_SUCCESS',
  'SET_MY_MOVIES'
);

export default TYPES

import createConstantObject from './lib/createConstantObject';

const TYPES = createConstantObject(
  'SET_SEARCH_TEXT',
  'SET_LOADING',
  'MOVIES_FETCH_ERROR',
  'MOVIES_FETCH_SUCCESS'
);

export default TYPES
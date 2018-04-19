import { combineReducers } from 'redux'
import moviesReducer from './movies-reducer'
import { reduxTokenAuthReducer } from 'redux-token-auth'

const rootReducer = combineReducers({
  movies: moviesReducer,
  reduxTokenAuth: reduxTokenAuthReducer
})

export default rootReducer

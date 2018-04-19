import { combineReducers } from 'redux'
import moviesReducer from './movies-reducer'
import notificationsReducer from './notifications-reducer'
import { reduxTokenAuthReducer } from 'redux-token-auth'

const rootReducer = combineReducers({
  movies: moviesReducer,
  notification: notificationsReducer,
  reduxTokenAuth: reduxTokenAuthReducer
})

export default rootReducer

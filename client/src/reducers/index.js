import { combineReducers } from 'redux'
import moviesReducer from './movies-reducer'
import notificationsReducer from './notifications-reducer'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  movies: moviesReducer,
  notification: notificationsReducer,
  reduxTokenAuth: reduxTokenAuthReducer,
  form: formReducer
})

export default rootReducer

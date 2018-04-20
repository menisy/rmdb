import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const storeEnhancers = compose(
                          applyMiddleware(thunk),
                          (window.devToolsExtension && window
                          .devToolsExtension()) || compose
                          )

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    storeEnhancers
  )
}

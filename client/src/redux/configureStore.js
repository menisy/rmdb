import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const storeEnhancers = compose(
                          applyMiddleware(thunk),
                          window.devToolsExtension && window.
                              window.devToolsExtension()
                          )

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    storeEnhancers
  )
}

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

let devTools = null

// Add dev tools binding only in development
if(process.env.NODE_ENV === 'development'){
  // Use || compose for other browsers
  devTools = (window.devToolsExtension && window
                          .devToolsExtension()) || compose
}

const storeEnhancers = compose(
                          applyMiddleware(thunk),
                          devTools || compose
                          )

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    storeEnhancers
  )
}

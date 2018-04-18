import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import moviesActions from './actions/movies-actions'

const storeEnhancers = compose(
                          applyMiddleware(thunk),
                          window.devToolsExtension && window.
                              window.devToolsExtension()
                          )

const store = createStore(rootReducer, storeEnhancers);

ReactDOM.render(<Provider store={store}>
                  <App searchQuery={'helelllo'}/>
                </Provider>
  , document.getElementById('root'));
registerServiceWorker();

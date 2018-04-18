import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import moviesActions from './actions/movies-actions'


const store = createStore(
  rootReducer,
  window.devToolsExtension && window.
      window.devToolsExtension() );

store.dispatch(moviesActions.moviesFetchSuccess(['dfdfd', 'fff']))


ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>
  , document.getElementById('root'));
registerServiceWorker();

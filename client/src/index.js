import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'

import configureStore from './redux/configureStore'

import { verifyCredentials } from './redux-token-auth-config'


const store = configureStore()
// user auth
verifyCredentials(store)

ReactDOM.render(<Provider store={store}>
                  <App searchQuery={'helelllo'}/>
                </Provider>
  , document.getElementById('root'));
registerServiceWorker();

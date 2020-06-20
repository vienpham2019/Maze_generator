import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import mazeGeneratorReducer from './reducer/mazeGeneratorReducer'

let store = createStore(              //==> take reducer
  mazeGeneratorReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
)

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


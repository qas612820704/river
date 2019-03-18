import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { StoreContext } from 'redux-react-hook';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import App from './App';
import './index.css';


const devtool = (process.env.NODE_ENV === 'development' && typeof window === 'object')
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;


const store = createStore(reducer, devtool(
  applyMiddleware(thunk)
));


render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);

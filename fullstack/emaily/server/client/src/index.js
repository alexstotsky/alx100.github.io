import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Temporary for in-browser req test
// import axios from 'axios';
// window.axios = axios;
// const survey = { title: 'my title', subject: 'my subject', recipients: 'stotsky.alex@gmail.com', body: 'test mail'};


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render( 
  <Provider store={store}><App /></Provider>, 
  document.querySelector('#root')
);


// console.log('stripe key is : ', process.env.REACT_APP_STRIPE_KEY);
// console.log('environment is : ', process.env.NODE_ENV);
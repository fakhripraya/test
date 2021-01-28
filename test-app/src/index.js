import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import PromiseSpinner from './Components/Promise';

ReactDOM.render(
  <React.StrictMode>
    <PromiseSpinner />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
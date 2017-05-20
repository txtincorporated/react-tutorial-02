import React from 'react';
import ReactDOM from 'react-dom';
import TweetsApp from './components/TweetsApp.jsx';

// Get initial state passed in from server
const initialState = JSON.parse(document.getElementById('initial-state').innerHTML); 

// Take over and finish component rendering as started on server
ReactDOM.render(
  <TweetsApp tweets={initialState}/>,
  document.getElementById('react-app')
);

import React from 'react';
import TweetsApp from './components/TweetsApp';

// Get initial state passed in from server
const initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Take over and finish component rendering as started on server
React.render(
  <TweetsApp tweets={initialState}/>,
  document.getElementById('react-app')
);

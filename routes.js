import JSX, { install } from 'node-jsx';
import React from 'react';
import TweetsApp from './components/TweetsApp.jsx';
import Tweet from './models/Tweet';

export default {
  // Static model method to get tweets from db
  index: (req, res) => {
    Tweet.getTweets(0, 0, (tweets, pages) => {
      const markup = React.renderToString(
        TweetsApp({
          tweets: tweets
          
        })
      );

      // Render 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client

      });
    });
  },

  page: (req, res) => {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, tweets => {
      res.send(tweets);

    });
  }
};

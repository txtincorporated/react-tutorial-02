import React, { Component } from 'react';
import Tweets from './Tweets';
import Loader from './Loader';
import NotificationBar from './NotificationBar';
import io from 'socket.io';

export default class TweetsApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      props: props || this.props,
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };
  }

  addTweet(tweet) {
    // Get current app state
    const updated = this.state.tweets;

    // Increment unread count
    const count = this.state.count + 1;

    // Increment skip count
    const skip = this.state.skip + 1;

    // Unshift tweet onto tweets array
    updated.unshift(tweet);

    // Set app state with new tweet data
    this.setState({ tweets: updated, count: count, skip: skip });

  }

  // Get JSON by page from server
  // Why are we not using Express for this?
  getPage(page) {
    // Set up AJAX req
    const request = new XMLHttpRequest();
    const self = this;

    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = () => {
      if(request.status >= 200 && request.status < 400) {
        self.loadPagedTweets(JSON.parse(request.responseText));
      } else {
        self.setState({ paging: false, done: true });
      }
    };

    request.send();

  };

  // Display new tweets
  showNewTweets() {
    // Get current app state
    const updated = this.state.tweets;

    // Mark tweets active
    updated.forEach(tweet => {tweet.active = true;});

    // Set app state (active tweets + reset unread count)
    this.setState({ tweets: updated, count: 0 });
  }

  // Load tweets fetched from server
  loadPagedTweets(tweets) {
    const self = this;

    if(tweets.length > 0) {
      // Get current application state
      const updated = this.state.tweets;

      // Push tweets to current tweets array
      tweets.forEach(tweet => updated.push(tweet));
      // Set timeout to slow app enough to require spinner -- demo purposes only
      setTimeout(() => {
        // Set app state (just adding tweets)
        self.setState({ tweets: updated, paging: false });
      }, 1000);
    } else {
      // Set app state (paging complete)
      this.setState({ done: true, paging: false });

    }
  }

  // Check scroll position to determine whether to load more tweets
  checkWindowScroll() {
    // Get scroll pos & window data
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const s = (document.body.scrollTop || document.documentElement.scrollTop || 0);
    const scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not paging and not complete
    if(scrolled && !this.state.paging && !this.state.done) {
      // Set app state to paging and increment page
      this.setState({ paging: true, page: this.state.page + 1 });

      // Get next page of tweets
      this.getPage(this.state.page);

    }
  }

  componentWillReceiveProps(newProps, oldProps) {
    this.setState(newProps => {
      return {
        tweets: newProps.tweets,
        count: newProps.count,
        page: newProps.page,
        paging: newProps.paging,
        skip: newProps.skip,
        done: newProps.done
      };
    });
  }

  componentDidMount() {
    // Scope 'this' to current module
    const self = this;
    // Init socket.io
    const socket = io.connect();
    // Listen for tweet event
    socket.on('tweet', data => self.addTweet(data));

    // Attach scroll event to window for infinity paging
    window.addEventListener('scroll', this.checkWindowScroll);
  }

  render() {
    return (
      <div className='tweets-app'>
        <Tweets tweets={this.state.tweets}/>
        <Loader paging={this.state.paging}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
      </div>
      
    );
  }
}

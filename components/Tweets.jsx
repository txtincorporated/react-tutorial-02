import React, { Component } from 'react';
import Tweet from './Tweet';

export default class Tweets extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    // Build list of single tweet components
    const content = this.props.tweets.map(tweet => {
      return(
        <Tweet key={ tweet._id } tweet={ tweet }/>

      );
    });

    return <ul className='tweets'>{ content }</ul>;

  }
}

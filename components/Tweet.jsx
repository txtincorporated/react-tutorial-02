import React, { Component } from 'react';

export default class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tweet = this.props.tweet;
    return(
      <li className={ 'tweet' + (tweet.active ? ' active' : '') }>
        <img src={ tweet.avatar } className='avatar'/>
        <blockquote>
          <cite>
            <a href={ 'https://twitter.com' + tweet.screenname }>{ tweet.author }</a>
            <span className='screen-name'>@{ tweet.screenname }</span>
          </cite>
          <span className='content'>{ tweet.body }</span>
        </blockquote>
      </li>

    );
  }
}

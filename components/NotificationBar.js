import React, { Component } from 'react';

export default class NotificationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const count = this.props.count;

    return(
      <div className={ 'notification-bar' + (count > 0 ? ' active' : '') }>
        <p>There are { count } new tweets! <a href='#top' onClick={this.props.onShowNewTweets}>Click to view.</a></p>
      </div>
      
    );
  }
}

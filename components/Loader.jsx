import React, { Component } from 'react';

export default class Loader extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className={ 'loader' + (this.props.paging ? ' active' : '') }>
        <img src='svg/loader.svg'/>
      </div>
      
    );
  }
}

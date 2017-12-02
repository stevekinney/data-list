import React, { Component } from 'react';

import data from '../data.json';

export default class Application extends Component {
  state = { data };

  render() {
    return (
      <div className="Application">
        <h1>Company Directory</h1>
      </div>
    );
  }
}

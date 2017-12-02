import React, { Component } from 'react';

import data from '../data.json';

export default class Application extends Component {
  state = { data };

  render() {
    return (
      <div className="Application">
        <h1>Company Directory</h1>
        <table>
          <thead />
          <tbody>
            {this.state.data.map(datum => (
              <tr>
                {Object.keys(datum).map(column => (
                  <td>{datum[column]}</td>
                 ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

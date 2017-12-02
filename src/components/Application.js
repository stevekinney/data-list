import React, { Component } from 'react';

import data from '../data.json';

class DataGrid extends Component {
  shouldComponentUpdate(nextState, nextProps) {
    return false;
  }

  render() {
    return (
      <table>
        <thead />
        <tbody>
          {this.props.data.map((datum) => (
            <tr>
              {Object.keys(datum).map((column) => (
                <td>{datum[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

class Filter extends Component {
  handleChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <section className="Filter">
        <input
          type="text"
          value={this.props.filterText}
          onChange={this.handleChange}
        />
      </section>
    );
  }
}

export default class Application extends Component {
  state = {
    data: data.slice(0, 10),
    filterText: '',
  };

  updateFilterText = (filterText) => {
    this.setState({ filterText });
  }

  render() {
    return (
      <div className="Application">
        <h1>Company Directory</h1>
        <Filter onChange={this.updateFilterText} />
        <DataGrid data={this.state.data} />
      </div>
    );
  }
}

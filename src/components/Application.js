import React, { Component, PureComponent } from 'react';
import moment from 'moment';
import orderBy from 'lodash/orderBy';

import data from '../data.json';

class NewGrudge extends PureComponent {
  state = {
    fullName: '',
    transgression: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { fullName, transgression } = this.state;

    onSubmit({
      id: Date.now(),
      fullName,
      transgression,
      forgiven: false,
      dateAdded: new Date(),
    });

    this.setState({
      fullName: '',
      transgression: '',
    });
  };

  render() {
    const { fullName, transgression } = this.state;
    return (
      <form className="NewGrudge" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={fullName}
          name="fullName"
          placeholder="Full Legal Name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          value={transgression}
          name="transgression"
          placeholder="What did they do?"
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}

class DataRow extends PureComponent {
  render() {
    const { datum, onForgive } = this.props;
    return (
      <tr>
        <td>{datum.fullName}</td>
        <td>{datum.transgression}</td>
        <td>{moment(datum.dateAdded).format('MMMM Do YYYY')}</td>
        <td>{datum.forgiven ? 'Forgiven' : 'Not Forgiven'}</td>
        <td>
          <button onClick={() => onForgive(datum.id)}>
            {datum.forgiven ? 'Unforgive' : 'Forgive'}
          </button>
        </td>
      </tr>
    );
  }
}

class DataGrid extends PureComponent {
  filterData = datum =>
    datum.transgression
      .toLowerCase()
      .includes(this.props.filterText.toLowerCase());

  renderDataRow = (datum, index) => {
    const { onForgive } = this.props;
    return <DataRow key={index} datum={datum} onForgive={onForgive} />;
  };

  render() {
    const { data, filterText, onForgive, onSort } = this.props;
    const filteredData = data.filter(this.filterData);

    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort('fullName')}>Full Legal Name</th>
            <th onClick={() => onSort('transgression')}>Transgression</th>
            <th onClick={() => onSort('dateAdded')}>Date of Incident</th>
            <th onClick={() => onSort('forgiven')}>Forgiven?</th>
            <th><button onClick={() => onSort('')} >Reset Sort</button></th>
          </tr>
        </thead>
        <tbody>{orderBy(filteredData, [this.props.sortBy]).map(this.renderDataRow)}</tbody>
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
    data,
    filterText: '',
    sortBy: '',
  };

  addGrudge = datum => {
    const { data } = this.state;
    this.setState({
      data: [...data, datum],
    });
  };

  forgiveGrudge = id => {
    performance.mark('start');
    const data = this.state.data.map(datum => {
      if (id !== datum.id) return datum;
      return { ...datum, forgiven: !datum.forgiven };
    });
    this.setState({ data });
    performance.mark('end');
    performance.measure('forgiveness', 'start', 'end');
    const [measure] = performance.getEntriesByName('forgiveness');
    console.log(measure);
  };

  updateFilterText = filterText => {
    this.setState({ filterText });
  };

  updateSortColumn = sortBy => {
    this.setState({ sortBy });
  };

  render() {
    return (
      <div className="Application">
        <h1>Company Directory</h1>
        <NewGrudge onSubmit={this.addGrudge} />
        <Filter onChange={this.updateFilterText} />
        <DataGrid
          data={this.state.data}
          filterText={this.state.filterText}
          onForgive={this.forgiveGrudge}
          onSort={this.updateSortColumn}
          sortBy={this.state.sortBy}
        />
      </div>
    );
  }
}

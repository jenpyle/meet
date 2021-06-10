import React, { Component, useState } from 'react';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
  };

  handleInputChanged = (event) => {
    /*changes state of query and suggestions on change
like typing on the keyboard
  */
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }); /**filter the state of suggestions and use the result as the state’s new value */
    this.setState({ query: value, suggestions });
  };
  render() {
    return (
      <div className="CitySearch">
        <input type="text" className="city" value={this.state.query} onChange={this.handleInputChanged} />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion}>{suggestion}</li>
          ))}
          <li key="all">
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;

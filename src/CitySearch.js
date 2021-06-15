import React, { Component } from 'react';
import { getEvents, extractLocations } from './api';
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
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

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column md="6">
              Search for events near you:
            </Form.Label>
            <Col md="6">
              <Form.Control
                type="text"
                className="city"
                placeholder="Search cities"
                value={this.state.query}
                onChange={this.handleInputChanged}
                onFocus={() => {
                  this.setState({ showSuggestions: true });
                }}
              />
            </Col>
          </Form.Group>
        </Form>
        {/* <Form>
          <Form.Group as={Row}>
            <Col>
              <Row>
                <Form.Label column>Search for events near you:</Form.Label>

                <Form.Control
                  type="text"
                  className="city"
                  placeholder="Search cities"
                  value={this.state.query}
                  onChange={this.handleInputChanged}
                  onFocus={() => {
                    this.setState({ showSuggestions: true });
                  }}
                />
              </Row>
            </Col>
          </Form.Group>
        </Form> */}
        {/* <input
          type="text"
          className="city"
          placeholder="Search cities"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        /> */}
        <ListGroup className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <ListGroup.Item
              className="list-item"
              action
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="list-item" action onClick={() => this.handleItemClicked('all')}>
            See all cities
          </ListGroup.Item>
        </ListGroup>
        {/* <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul> */}
      </div>
    );
  }
}

export default CitySearch;

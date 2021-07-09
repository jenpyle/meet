import React, { Component } from 'react';
import { Col, Form, ListGroup, Row } from 'react-bootstrap';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      suggestions: [],
      showSuggestions: undefined,
      infoText: '',
    };
  }

  handleInputChanged = (event) => {
    /*changes state of query and suggestions on change
like typing on the keyboard
  */
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }); /**filter the state of suggestions and use the result as the state’s new value */
    this.setState({ query: value, suggestions });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: '',
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            {this.state.infoText === '' ? (
              <Form.Label column md="6" className="resize">
                Search for events near you:
              </Form.Label>
            ) : (
              <Form.Label column md="6" className="resize">
                <InfoAlert text={this.state.infoText} />
              </Form.Label>
            )}
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
      </div>
    );
  }
}

export default CitySearch;

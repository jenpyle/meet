import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value,
    });
    this.props.updateEventNumber(value);
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className="NumberOfEvents">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column md="6">
              Number of Events:
            </Form.Label>
            <Col md="6">
              <Form.Control
                className="numEventInput"
                type="number"
                placeholder="Enter number of events to view"
                value={numberEvents}
                onChange={this.handleInputChanged}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default NumberOfEvents;

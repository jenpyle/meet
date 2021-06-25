import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 5,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value < 1 ? 0 : value,
    });
    this.props.updateEventNumber(event.target.value);
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className="NumberOfEvents">
        <Form>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            {this.state.numberEvents >= 1 ? (
              <Form.Label column md="6">
                Number of Events:
              </Form.Label>
            ) : (
              <Form.Label column md="6">
                <ErrorAlert text="Set number from 1 to 32" />
              </Form.Label>
            )}
            <Col md="6">
              <Form.Control
                className="numEventInput"
                min="0"
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

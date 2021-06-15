import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value,
    });
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className="NumberOfEvents">
        {/* <Container className="NumberOfEvents">
          <Row>
            <Col> */}
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
                defaultValue={numberEvents}
                onChange={this.handleInputChanged}
              />
            </Col>
          </Form.Group>
        </Form>
        {/* </Col>
          </Row>
        </Container> */}
        {/* <input type="number" className="numEventInput" value={numberEvents} onChange={this.handleInputChanged} /> */}
      </div>
    );
  }
}
export default NumberOfEvents;

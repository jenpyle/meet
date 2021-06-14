import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';

class Event extends Component {
  state = {
    showingDetails: false,
    buttonLabel: 'Show Details',
  };

  toggleshowingDetails = () => {
    this.setState({
      showingDetails: !this.state.showingDetails,
    });

    if (this.state.showingDetails === true) {
      this.setState({
        buttonLabel: 'Show Details',
      });
    } else {
      this.setState({
        buttonLabel: 'Hide Details',
      });
    }
  };
  render() {
    console.log('11111showingDetails= ', this.state.showingDetails, '  buttonLabel= ', this.state.buttonLabel);

    const { eventData } = this.props;
    const { showingDetails, buttonLabel } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <div className="Event">
              <h2 className="title">{eventData.summary}</h2>
              <p className="details">
                <div>Start: {eventData.start.dateTime}</div>
                <div> End: {eventData.end.dateTime}</div>
                <div>TimeZone: {eventData.start.timeZone}</div>
              </p>
              {/* <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Click me!
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Click me!
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}

              <Button variant="primary" className="detailsButton" onClick={this.toggleshowingDetails}>
                {buttonLabel}
              </Button>
              {showingDetails === true ? (
                <div className="moreDetails">
                  About Event {eventData.htmlLink} {eventData.description} Contact: {eventData.organizer.email}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Event;

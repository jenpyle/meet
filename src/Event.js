import React, { Component } from 'react';
import { Container, Row, Col, Button, Card, Accordion } from 'react-bootstrap';

class Event extends Component {
  state = {
    buttonLabel: 'Show Details',
  };

  toggleshowingDetails = () => {
    if (this.state.buttonLabel === 'Show Details') {
      this.setState({
        buttonLabel: 'Hide Details',
      });
    } else {
      this.setState({
        buttonLabel: 'Show Details',
      });
    }
  };
  render() {
    const { eventData } = this.props;
    const { buttonLabel } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Accordion>
              <Card className="Event">
                <Card.Header className="details">
                  <h2 className="title">{eventData.summary}</h2>

                  <div>Start: {eventData.start.dateTime}</div>
                  <div> End: {eventData.end.dateTime}</div>
                  <div>TimeZone: {eventData.start.timeZone}</div>

                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="detailsButton"
                    onClick={this.toggleshowingDetails}
                  >
                    {buttonLabel}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="moreDetails">
                    <Card.Title>About Event</Card.Title>
                    <Card.Text>
                      {eventData.description} <h6>Contact: {eventData.organizer.email}</h6>
                      <Button variant="primary" href={eventData.htmlLink} target="_blank">
                        View in Google Calendar
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Event;

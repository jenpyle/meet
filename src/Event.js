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
                <Card.Body className="details">
                  <Card.Title className="title">{eventData.summary}</Card.Title>
                  <Card.Text>
                    Start: {eventData.start.dateTime}
                    <br></br>
                    End: {eventData.end.dateTime}
                    <br></br>
                    TimeZone: {eventData.start.timeZone}
                  </Card.Text>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="0"
                    className="detailsButton"
                    onClick={this.toggleshowingDetails}
                  >
                    {buttonLabel}
                  </Accordion.Toggle>
                </Card.Body>

                <Accordion.Collapse eventKey="0">
                  <Card.Body className="moreDetails">
                    <Card.Title>About Event</Card.Title>

                    <Card.Text>
                      {eventData.description}
                      <Card.Subtitle>
                        Contact:{' '}
                        <a href="mailto:{eventData.organizer.email}" target="_blank" rel="noreferrer">
                          {eventData.organizer.email}
                        </a>
                      </Card.Subtitle>
                      <Button variant="primary" className="calendarLink" href={eventData.htmlLink} target="_blank">
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

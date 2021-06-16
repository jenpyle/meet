import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { Container, Row, Col } from 'react-bootstrap';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 32,
  };

  componentDidMount() {
    /**
   * load events when the app loads.
    make the API call and save the initial data to state
   */
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        /**look at componentWillUnmount */
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    /*
    to fix issue with unmounting before getEvents API call is finished, we
    use this boolean to update the state only if this.mounted is true
    */
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = location === 'all' ? events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };

  updateEventNumber = (numberEvents) => {
    this.setState({
      number: numberEvents,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
              <NumberOfEvents updateEventNumber={this.updateEventNumber} />
              <EventList events={this.state.events} number={this.state.number} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents } from './api';
import { Container, Row, Col } from 'react-bootstrap';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 5,
    offline: false,
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
        this.setState({
          events,
          locations: extractLocations(events),
          // offline: navigator.onLine ? false : true,
        });
      }
    });
  }

  componentWillUnmount() {
    /*
    to fix issue with unmounting before getEvents API call is finished, we
    use this boolean to update the state only if this.mounted is true
    */
    this.mounted = false;
    // window.removeEventListener('offline');
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = location === 'all' ? events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        // offline: navigator.onLine ? false : true,
      });
    });
  };

  updateEventNumber = (numberEvents) => {
    console.log('navigator.onLine?=', navigator.onLine, '  this.state.offline=', this.state.offline);
    this.setState({
      number: numberEvents,
      // offline: navigator.onLine ? false : true,
    });
  };

  render() {
    let offlineAlertText = '';

    if (!navigator.onLine) {
      offlineAlertText = 'You are currently offline. Event list may not be current.';
    }
    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <WarningAlert text={offlineAlertText} />
              {/* {this.state.offline && (
                <WarningAlert text="You are offline! These events have been loaded from the cache" />
              )} */}
              {/* {navigator.onLine ? null : (
                <WarningAlert text="You are offline! These events have been loaded from the cache" />
              )} */}
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
              <NumberOfEvents updateEventNumber={(value) => this.updateEventNumber(value)} />
              <EventList events={this.state.events} number={this.state.number} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

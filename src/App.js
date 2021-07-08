import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { Container, Row, Col } from 'react-bootstrap';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 5,
    offline: false,
    showWelcomeScreen: undefined,
  };

  // componentDidMount() {
  //   /**
  //  * load events when the app loads.
  //   make the API call and save the initial data to state
  //  */
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       /**look at componentWillUnmount */
  //       this.setState({
  //         events,
  //         locations: extractLocations(events),
  //       });
  //     }
  //   });
  // }
  async componentDidMount() {
    this.mounted = true;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
          });
        }
      });
    } else {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
          }
        });
      }
    }
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
    console.log('navigator.onLine?=', navigator.onLine, '  this.state.offline=', this.state.offline);
    this.setState({
      number: numberEvents,
    });
  };

  render() {
    // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    //   alert("It's a local server!");
    // if (this.state.showWelcomeScreen === undefined) {
    //   return <div className="App" />;
    // }
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
              <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
              <NumberOfEvents updateEventNumber={(value) => this.updateEventNumber(value)} />
              <EventList events={this.state.events} number={this.state.number} />
              <WelcomeScreen
                showWelcomeScreen={this.state.showWelcomeScreen}
                getAccessToken={() => {
                  getAccessToken();
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

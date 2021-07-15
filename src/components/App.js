import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { checkToken, extractLocations, getAccessToken, getEvents } from '../api/api';
import '../css/App.css';
import '../css/nprogress.css';
import { WarningAlert } from './Alert';
import CitySearch from './CitySearch';
import EventGenre from './EventGenre';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 5,
    offline: false,
    showWelcomeScreen: undefined,
  };

  loadEvents = () => {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
        });
      }
    });
  };

  async componentDidMount() {
    /**
     *load events when the app loads.
     *make the API call and save the initial data to state
     */
    this.mounted = true;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.loadEvents();
    } else {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        this.loadEvents();
      }
    }
  }

  componentWillUnmount() {
    /*
     *to fix issue with unmounting before getEvents API call is finished, we
     *use this boolean to update the state only if this.mounted is true
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { events, locations, number, showWelcomeScreen } = this.state;
    let offlineAlertText = '';
    if (!navigator.onLine) {
      offlineAlertText = 'You are currently offline. Event list may not be current.';
    }
    return (
      <Container>
        <Row>
          <Col>
            <div className="App">
              <h1 className="main">Meet App</h1>
              <WarningAlert text={offlineAlertText} />
              <CitySearch locations={locations} updateEvents={this.updateEvents} />
              <NumberOfEvents updateEventNumber={(value) => this.updateEventNumber(value)} />
              <h3 className="graphs-header">Events in each city:</h3>
              <div className="data-vis-wrapper">
                <EventGenre events={events} />
                <ResponsiveContainer height={400}>
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis type="category" dataKey="city" name="city" />
                    <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={this.getData()} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <EventList events={events} number={number} />
              <WelcomeScreen
                showWelcomeScreen={showWelcomeScreen}
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

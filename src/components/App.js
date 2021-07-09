import React, { Component } from 'react';
import '../css/App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from '../api/api';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    number: 5,
    offline: false,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    /**
   *load events when the app loads.
    make the API call and save the initial data to state
  */
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

  getData = () => {
    /**Gets the number of events at locations
   * uses the locations and events saved in your state from the Google Calendar API. 
    You then map the locations and filter the events by each location to get the length 
    of the resulting array. 
   */
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      /**split the location at the occurrence of a comma followed by a space ", ", which will return an array */
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

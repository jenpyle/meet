import { mount, shallow } from 'enzyme';
import React from 'react';
import { extractLocations, getEvents } from '../api/api';
import App from '../components/App';
import CitySearch from '../components/CitySearch';
import EventList from '../components/EventList';
import { mockData } from '../mock-data/mock-data';
import NumberOfEvents from '../components/NumberOfEvents';

let AppWrapper;
describe('<App /> component', () => {
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render EventList component', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  }); //test that the component CitySearch exists

  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  beforeEach(() => {
    AppWrapper = mount(<App />);
  });
  test('App passes "events" state as a prop to EventList', () => {
    AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined); //important to precede next line to ensure props are passing correctly and not undefined
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState); //checking that EventLists event prop is the same as events state from App
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); //sug state set to all available cities
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); //used handleItemClicked method from CitySearch(this is possible with using instance)
    /**^it’s expected that it will have async code that involves fetching the full list of events before
     * filtering them down to the list of events that match the selected city.  */
    const allEvents = await getEvents();
    /**
     * ^get all the events from the API asynchronously (and from the mock data when it’s used in tests).
     */
    const eventsToShow = allEvents.filter((event) => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    /**
     * ^whether the state of events actually takes the same array as the events that resulted from
     * the filtering process in the previous step
     */
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions .list-item');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('Changing the numberEvents state in NumberOfEvents should change the number state for App', () => {
    AppWrapper = mount(<App />);
    const NumberOfEventsWrapper2 = AppWrapper.find(NumberOfEvents);
    const locations = extractLocations(mockData);
    NumberOfEventsWrapper2.setState({ numberEvents: locations.length }); //mock data's length is 2
    const eventObject = { target: { value: 1 } };
    NumberOfEventsWrapper2.find('.numEventInput').at(0).simulate('change', eventObject);
    expect(NumberOfEventsWrapper2.state('numberEvents')).toBe(1);
    expect(AppWrapper.state('number')).toBe(1);
    AppWrapper.unmount();
  });

  test('App passes "number" state as a prop to EventList', () => {
    AppWrapper = mount(<App />);
    const AppNumberState = AppWrapper.state('number');
    expect(AppNumberState).not.toEqual(undefined); //important to precede next line to ensure props are passing correctly and not undefined
    expect(AppWrapper.find(EventList).props().number).toEqual(AppNumberState); //checking that EventLists event prop is the same as events state from App
    AppWrapper.unmount();
  });

  test('EventList renders correct number of events based on number prop from App', async () => {
    AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    AppWrapper.setState({ events: allEvents });
    const EventListLength = AppWrapper.find(EventList).find('.EventList li').length;
    expect(EventListLength).toEqual(5); //mockData.length is 2
    AppWrapper.setState({ number: 1 }); //user changes number of events
    expect(AppWrapper.find(EventList).props().number).toEqual(1); //number prop is passed to EventList
    const EventListLength2 = AppWrapper.find(EventList).find('.EventList li').length;
    expect(EventListLength2).toEqual(1); //correct number of events rendered in EventList after changing number prop in App
    AppWrapper.unmount();
  });
});

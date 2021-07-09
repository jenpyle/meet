import { mount, shallow } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import { getEvents } from '../api/api';
import App from '../components/App';
import EventList from '../components/EventList';
import NumberOfEvents from '../components/NumberOfEvents';
// console.log(CitySearchWrapper.debug({ verbose: true }));

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  let NumberOfEventsWrapper;
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the main view has been loaded', () => {
      AppWrapper = mount(<App />); //using mount bc need App's children
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    when('the number of events is not specified', () => {
      expect(AppWrapper.state('number')).toBe(5);
      expect(NumberOfEventsWrapper.state('numberEvents')).toBe(5);
      const NumberOfEventsWrapper2 = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper2.state('numberEvents')).toBe(5);
    });

    then('a maximum of 5 events will appear', () => {
      // AppWrapper.update(); //bc getting events is async
      expect(AppWrapper.find('.Event').length).toBeLessThanOrEqual(5);
      AppWrapper.unmount();
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the main view has been loaded', async () => {
      AppWrapper = mount(<App />);
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      const allEvents = await getEvents();
      AppWrapper.setState({ events: allEvents });
    });

    when('the number of events is set to a specific range', () => {
      const eventObject = { target: { value: 1 } };
      NumberOfEventsWrapper.find('.numEventInput').at(0).simulate('change', eventObject);
      const AppNumberState = AppWrapper.state('number');
      expect(NumberOfEventsWrapper.state('numberEvents')).toBe(1);
      expect(AppWrapper.state('number')).toBe(1);
      expect(AppWrapper.find(EventList).props().number).toEqual(AppNumberState); //checking that EventLists event prop is the same as events state from App
    });

    then('a maximum of the specified number of events will appear', () => {
      let EventListLength = AppWrapper.find(EventList).find('.EventList li').length;
      expect(EventListLength).toBeLessThanOrEqual(1);
      AppWrapper.unmount();
    });
  });
});

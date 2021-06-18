import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import EventList from '../EventList';
import Event from '../Event';
import NumberOfEvents from '../NumberOfEvents';
// console.log(CitySearchWrapper.debug({ verbose: true }));

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  let EventListWrapper;
  let EventWrapper;
  let NumberOfEventsWrapper;
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the main view has been loaded', () => {
      EventWrapper = shallow(<NumberOfEvents />);
      EventListWrapper = mount(<EventList events={mockData} />);
    });

    when('the number of events is not specified', () => {});

    then('a maximum of 32 events will appear', () => {});
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the main view has been loaded', () => {});

    when('the number of events is set to a specific range', () => {});

    then('a maximum of the specified number of events will appear', () => {});
  });
});

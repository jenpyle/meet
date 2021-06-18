import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import EventList from '../EventList';
import Event from '../Event';
// console.log(CitySearchWrapper.debug({ verbose: true }));

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  let EventListWrapper;
  let EventWrapper;
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the list of events has been loaded', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event eventData={mockData[0]} />);
    });

    when('the event page is showing and the “Show details” button is not yet selected on an event', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
    });

    then('the event will remain collapsed', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
      // console.log(EventWrapper.find('.accordion').props());
      // console.log(EventWrapper.debug({ verbose: true }));
      // expect(EventWrapper.find('.accordion').hasClass('collapse')).toEqual(true);
      // expect(EventWrapper.find('.accordion').hasClass('collapsing')).toEqual(true);
      // expect(EventWrapper.find('.moreDetails').props.style).toHaveProperty('display', 'none');
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the list of events has been loaded', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event eventData={mockData[0]} />);
    });

    when('user clicks on “Show details” button for an event', () => {
      EventWrapper.find('.detailsButton').at(1).simulate('click');
    });

    then('the event element will be expanded to show the event details', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Hide Details');
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the detailed view of an event has been loaded', () => {
      EventWrapper.setState({
        buttonLabel: 'Hide Details',
      });
    });

    when('user clicks on “Hide details” button for an event', () => {
      EventWrapper.find('.detailsButton').at(1).simulate('click');
    });

    then('the event element will be collapsed to hide the event details', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
    });
  });
});

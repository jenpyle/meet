import { mount } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import Event from '../components/Event';
import { mockData } from '../mock-data/mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let EventWrapper;
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the list of events has been loaded', () => {
      EventWrapper = mount(<Event eventData={mockData[0]} />);
    });
    when('the event page is showing and the “Show details” button is not yet selected on an event', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
    });

    then('the event will remain collapsed', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the list of events has been loaded', () => {
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
      EventWrapper = mount(<Event eventData={mockData[0]} />);
      EventWrapper.find('.detailsButton').at(0).simulate('click');
      expect(EventWrapper.state('buttonLabel')).toBe('Hide Details');
    });

    when('user clicks on “Hide details” button for an event', () => {
      EventWrapper.find('.detailsButton').at(0).simulate('click');
    });

    then('the event element will be collapsed to hide the event details', () => {
      expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event'; // in src/__tests__/EventList.test.js
import { mockData } from '../mock-data';

////FEATURE 2////////////////////////////////////////////////////////////////////////////////////////
describe('<Event /> component', () => {
  let eventData, EventWrapper;
  beforeAll(() => {
    eventData = mockData[0];
    EventWrapper = shallow(<Event eventData={mockData[0]} />);
  });

  test('Render the Event element', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
  });

  test('Render Event Title', () => {
    expect(EventWrapper.find('.Event .title').text()).toBe(eventData.summary);
  });

  test('Render basic Event details', () => {
    expect(EventWrapper.find('.Event .details').text()).toBe(
      'Start: ' +
        eventData.start.dateTime +
        '\nEnd: ' +
        eventData.end.dateTime +
        '\nTimeZone: ' +
        eventData.start.timeZone
    );
  });

  test('Event is collapsed by default', () => {
    expect(EventWrapper.state('showDetails')).toBe(false);
  });

  test('Event has a "show details" button', () => {
    expect(EventWrapper.find('.detailsButton')).toHaveLength(1);
  });

  test("Clicking 'Show Details' should change state of showDetails to TRUE", () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });

  test('Render MORE Event details when showDetails is TRUE', () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find('.Event .moreDetails').text()).toBe(
      'About Event\n' + eventData.htmlLink + '\n' + eventData.description + '\nContact: ' + eventData.organizer.email
    );
  });

  test("Clicking 'Hide Details' should change state of showDetails to FALSE", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(false);
  });

  test('When Show Details is FALSE, do NOT render more details', () => {
    EventWrapper.setState({
      showDetails: false,
    });
    expect(EventWrapper.find('.Event .moreDetails')).toHaveLength(0);
  });

  test('When Show Details is clicked, buttonLabel is set to "Hide Details"', () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Hide Details');
  });

  test('When Hide Details is clicked, buttonLabel is set to "Show Details"', () => {
    EventWrapper.setState({
      showDetails: true,
    });
    EventWrapper.find('.detailsButton').simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
  });
});

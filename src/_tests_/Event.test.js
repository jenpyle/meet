import { mount, shallow } from 'enzyme';
import React from 'react';
import Event from '../components/Event'; // in src/__tests__/EventList.test.js
import { mockData } from '../mock-data/mock-data';
// console.log(EventWrapper.debug({ verbose: true }));

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

  test('Render basic event details', () => {
    expect(EventWrapper.find('.Event .details').text()).toContain(
      eventData.start.dateTime,
      eventData.end.dateTime,
      eventData.start.timeZone
    );
  });

  test('MORE event details contents exist(hidden)', () => {
    expect(EventWrapper.find('.Event .moreDetails').text()).toContain(
      eventData.description,
      eventData.organizer.email,
      eventData.htmlLink
    );
  });

  test('Event has a "show details" button', () => {
    expect(EventWrapper.find('.detailsButton').at(0)).toHaveLength(1);
  });

  test('Event is collapsed by default', () => {
    EventWrapper = mount(<Event eventData={mockData[0]} />);
    expect(EventWrapper.find('Accordion').prop('defaultActiveKey')).toBeUndefined();
  });

  test('When Show Details is clicked, Accordion expands and buttonLabel is set to "Hide Details"', () => {
    EventWrapper.setState({
      buttonLabel: 'Show Details',
    });
    EventWrapper.find('.detailsButton').at(1).simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Hide Details');
  });

  test('When Hide Details is clicked, Accordion collapses and buttonLabel is set to "Show Details"', () => {
    EventWrapper.setState({
      buttonLabel: 'Hide Details',
    });
    EventWrapper.find('.detailsButton').at(1).simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
  });
});

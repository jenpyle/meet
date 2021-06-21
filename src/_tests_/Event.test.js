import React from 'react';
import { shallow, mount } from 'enzyme';
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

  test('Render basic event details', () => {
    expect(EventWrapper.find('.Event .details').text()).toContain(
      eventData.start.dateTime,
      eventData.end.dateTime,
      eventData.start.timeZone
    );
  });

  test('Render MORE event details', () => {
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
    expect(EventWrapper.find('.accordion').prop('defaultActiveKey')).toBeUndefined();
  });
  ///How do I write these tests correctly?/////////////////////////////////////////////////////////////////////////
  // test('When Show Details is clicked, show more details(accordion expands)', () => {
  //   // const accordion = shallow(<Event eventData={mockData[0]} />).find('Accordion');
  //   // console.log('00000', accordion);
  //   EventWrapper = mount(<Event eventData={mockData[0]} />);
  //   EventWrapper.find('.detailsButton').at(1).simulate('click');
  //   console.log(EventWrapper.debug({ verbose: true }));
  //   expect(EventWrapper.find('.Event').at(1).hasClass('show')).toEqual(true);
  // });

  // test('When Hide Details is clicked, details will collapse(accordion collapses)', () => {
  //   EventWrapper = mount(<Event eventData={mockData[0]} />);
  //   EventWrapper.find('.accordion .detailsButton').at(1).simulate('click');
  //   expect(EventWrapper.find('.Event').at(1).hasClass('.show')).toEqual(false);
  // });
  ////////////////////////////////////////////////////////////////////////////

  test('When Show Details is clicked, buttonLabel is set to "Hide Details"', () => {
    EventWrapper.setState({
      buttonLabel: 'Show Details',
    });
    EventWrapper.find('.detailsButton').at(1).simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Hide Details');
  });

  test('When Hide Details is clicked, buttonLabel is set to "Show Details"', () => {
    EventWrapper.setState({
      buttonLabel: 'Hide Details',
    });
    EventWrapper.find('.detailsButton').at(1).simulate('click');
    expect(EventWrapper.state('buttonLabel')).toBe('Show Details');
  });
});

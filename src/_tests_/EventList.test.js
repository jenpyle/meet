import { shallow } from 'enzyme';
import React from 'react';
import Event from '../components/Event'; // in src/__tests__/EventList.test.js
import EventList from '../components/EventList';
import { mockData } from '../mock-data/mock-data';

////FEATURE 1////////////////////////////////////////////////////////////////////////////////////////
describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length); //test that the component Event exists
  });
  ////FEATURE 1////////////////////////////////////////////////////////////////////////////////////////
});

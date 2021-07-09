import { shallow } from 'enzyme';
import React from 'react';
import Event from '../components/Event';
import EventList from '../components/EventList';
import { mockData } from '../mock-data/mock-data';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length); //test that the component Event exists
  });
});

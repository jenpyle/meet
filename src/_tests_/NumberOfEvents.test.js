import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  test('Render NumberOfEvents text input', () => {
    expect(NumberOfEventsWrapper.find('.numEventInput')).toHaveLength(1);
  });
  test('Default number of events is 32', () => {
    expect(NumberOfEventsWrapper.state('numberEvents')).toBe(32);
  });
  test('Number of events box accepts "number" type as user input', () => {
    expect(NumberOfEventsWrapper.find('.numEventInput').prop('type')).toBe('number');
  });
  test('renders text input correctly', () => {
    const numberEvents = NumberOfEventsWrapper.state('numberEvents');
    expect(NumberOfEventsWrapper.find('.numEventInput').prop('value')).toBe(numberEvents);
  });
  //simulating changing the event.target.value from the user inputting 5
  test('change state when number input changes', () => {
    const eventObject = { target: { value: 5 } };
    NumberOfEventsWrapper.find('.numEventInput').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberEvents')).toBe(5);
  });
});

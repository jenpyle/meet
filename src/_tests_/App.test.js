import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

////FEATURE 1////////////////////////////////////////////////////////////////////////////////////////
describe('<App /> component', () => {
  //use describe for making a scope
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render EventList component', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  }); //test that the component CitySearch exists
  ////FEATURE 1////////////////////////////////////////////////////////////////////////////////////////
  ////FEATURE 3////////////////////////////////////////////////////////////////////////////////////////
  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
  ////FEATURE 3////////////////////////////////////////////////////////////////////////////////////////
});

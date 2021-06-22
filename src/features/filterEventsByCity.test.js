import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
// console.log(CitySearchWrapper.debug({ verbose: true }));

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    let AppWrapper;
    given('user hasn’t searched for any city', () => {}); //nothing happens so leave empty
    when('the user opens the app', () => {});
    AppWrapper = mount(<App />); //using mount bc need App's children
    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update(); //bc getting events is async
      expect(AppWrapper.find('.Event').hostNodes()).toHaveLength(mockData.length);
      AppWrapper.unmount();
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper;
    given('the main page is open', () => {});
    let locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />); //shallow bc you don’t need to render any of CitySearch’s children
    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });
    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions .list-item')).toHaveLength(2); //2 because of the "See all cities" option
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppWrapper;
    given('user was typing “Berlin” in the city textbox', async () => {
      //async to allow App component to properly load the events and locations
      AppWrapper = await mount(<App />); //mount bc the test will require interaction with its child, the CitySearch component.
      AppWrapper.find('.city')
        .hostNodes()
        .simulate('change', { target: { value: 'Berlin' } });
    });
    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('ListGroupItem')).toHaveLength(2); //2 because of the "See all cities" option
    });
    when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
      AppWrapper.update();
      AppWrapper.find('ListGroupItem').at(0).simulate('click');
    });
    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      const CitySearchWrapper = AppWrapper.find(CitySearch);
      expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
    });
    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
      AppWrapper.unmount();
    });
  });
});

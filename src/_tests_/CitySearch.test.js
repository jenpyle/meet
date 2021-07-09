import { shallow } from 'enzyme';
import React from 'react';
import { extractLocations } from '../api/api';
import CitySearch from '../components/CitySearch';
import { mockData } from '../mock-data/mock-data';

describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />); //locations being passed to CitySearch component
  });
  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });
  test('render a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    CitySearchWrapper.setState({
      query: 'Munich',
    });
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions .list-item')).toHaveLength(suggestions.length + 1); //plus 1 due to additional "see all cities" option
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions .list-item').at(i).text()).toBe(suggestions[i]); //rendered text is checked to ensure its also been taken from state
    }
  });
  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] }); //states get emptied
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    }); //in CitySearch .city class is the query, and is changing value of query to Berlin
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    }); //filtering location prop against the state of query
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });
  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
    });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions .list-item').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });
  test('selecting CitySearch input reveals the suggestions list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
  });
  test('Selecting a suggestion should hide the suggestions list', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined,
    });
    CitySearchWrapper.find('.suggestions .list-item').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
  });
});

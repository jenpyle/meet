import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
  render() {
    const { events, number } = this.props;

    return (
      <ul className="EventList">
        {events.slice(0, number).map((event) => (
          <li key={event.id}>
            <Event eventData={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;

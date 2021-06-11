import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
    buttonLabel: 'Show Details',
  };

  toggleShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
      buttonLabel: 'Show Details',
    });

    if (this.state.showDetails) {
      this.setState({
        buttonLabel: 'Hide Details',
      });
    }
  };
  render() {
    const { eventData } = this.props;
    const { showDetails, buttonLabel } = this.state;
    return (
      <div className="Event">
        <h2 className="title">{eventData.summary}</h2>
        <p className="details">
          `Start: ${eventData.start.dateTime}, End: ${eventData.end.dateTime}, TimeZone: ${eventData.start.timeZone}`
        </p>
        <button className="detailsButton" onClick={this.toggleShowDetails}>
          {buttonLabel}
        </button>
        {showDetails ? (
          <div className="moreDetails">
            `About Event\n ${eventData.htmlLink} <br></br> ${eventData.description} Contact: $
            {eventData.organizer.email}`
          </div>
        ) : null}
      </div>
    );
  }
}
export default Event;

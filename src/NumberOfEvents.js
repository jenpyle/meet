import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberEvents: value,
    });
  };

  render() {
    const { numberEvents } = this.state;
    return (
      <div className="NumberOfEvents">
        <input type="number" className="numEventInput" value={numberEvents} onChange={this.handleInputChanged} />
      </div>
    );
  }
}
export default NumberOfEvents;

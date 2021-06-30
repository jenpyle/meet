import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  /**
   *
   * Shows the alert when infoText state(in CitySearch) contains text, otherwise it will not render
   */
  constructor(props) {
    super(props);
    this.color = 'blue';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bold',
      fontSize: '63%',
    };
  };
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bold',
      fontSize: '75%',
    };
  };
}
export { ErrorAlert };

export { InfoAlert };

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
      background: 'rgba(169, 169, 169, .4)',
      'border-radius': '10px',
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
      background: 'rgba(169, 169, 169, .4)',
      'border-radius': '5px',
    };
  };
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'yellow';
  }

  getStyle = () => {
    return {
      color: this.color,
      fontWeight: 'bolder',
      fontSize: '75%',
      background: 'rgba(169, 169, 169, .6)',
      'border-radius': '60px',
    };
  };
}

export { ErrorAlert, InfoAlert, WarningAlert };

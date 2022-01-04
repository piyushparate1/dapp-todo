import React from "react";

export default class FilterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={this.props.isPressed}
        onClick={() => this.props.setFilter(this.props.name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{this.props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
}
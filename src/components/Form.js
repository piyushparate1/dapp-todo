import React, { useState } from "react";
import { render } from "react-dom";

export default class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addTask(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
}
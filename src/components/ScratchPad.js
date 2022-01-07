import React from "react";
import { MainContext } from "../contexts/MainContext";

export default class ScratchPad extends React.Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    this.state = {name : ''}
  }

  componentDidMount() {
    this.setState({name: this.context.name});
  }

  render() {
    return (
      <span>
        <br></br>
        <hr></hr>
        <h5>ScratchPad - {this.state.name}</h5>
        <hr></hr>
        <br></br>
      </span>
    );
  }
}
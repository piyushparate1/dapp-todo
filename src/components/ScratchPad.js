import React from "react";
import { MainContext } from "../contexts/MainContext";
import { useContext } from "react";

export default class ScratchPad extends React.Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    this.state = {}
    //const theme = useContext(ThemeContext);
    debugger;
  }

  componentDidMount() {
    const context = this.context;
    const theme = useContext(MainContext);
    debugger;
    /* perform a side-effect at mount using the value of UserContext */
  }
  componentDidUpdate() {
    let value = this.context;
    //const theme = useContext(ThemeContext);
    //debugger;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    //const theme = useContext(ThemeContext);
    //debugger;

    /* ... */
  }

  render() {
    let value = this.context;
    //const theme = useContext(ThemeContext);
    debugger;

    /* render something based on the value of UserContext */

    return (
      <span>
        <br></br>
        <hr></hr>
        <h5>ScratchPad</h5>
        <hr></hr>
        <br></br>
      </span>
    );
  }
}
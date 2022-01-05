import React from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from '../config'

export default class ScratchPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
    }
  }

  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    const task = await todoList.methods.Get(this.state.account).call();
    //const tasksCounter = await todoList.methods.todoCounter().call();
    //debugger;
    //const tasks = await todoList.methods.todoCollection();

    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call()
    //   this.setState({
    //     tasks: [...this.state.tasks, task]
    //   })
    // }

}

  render() {
    return (
      <span>
        <br></br>
        <h5>{this.state.account}</h5>
      </span>
    );
  }
}
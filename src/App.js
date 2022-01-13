import './App.css';
import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import Web3 from "web3";
import TodoContract from './contracts/Todo.json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'All',
      account: '',
      isCompatible: false,
    }

    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.loadTask = this.loadTask.bind(this);
    this.onAccountsChanged = this.onAccountsChanged.bind(this);
  }

  async componentDidMount() {

    await this.IdentifyCompatible();

    if (this.state.isCompatible) {
      this.loadTask();
      this.onAccountsChanged();
    }
  }

  async IdentifyCompatible() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        //web3.eth.sendTransaction({/* ... */ });

        this.setState({ isCompatible: true });

      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
      //web3.eth.sendTransaction({/* ... */ });
      this.setState({ isCompatible: true });

    }
    // Non-dapp browsers...
    else {
      this.setState({ isCompatible: false });
    }
  }

  onAccountsChanged() {
    window.ethereum.on('accountsChanged', ((e) => {
      this.loadTask();
    }).bind(this));
  }

  async loadTask() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);

    const taskList = await todoContract.methods.Get(this.state.account).call();

    this.setState({
      tasks: taskList.map(task => {
        return { id: task.id, name: task.name, completed: task.completed };
      }),
    });
  }

  async addTask(name) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);

    await todoContract.methods.Add(name).send({ from: this.state.account });
    await this.loadTask();
  }

  async toggleTaskCompleted(id) {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);

    await todoContract.methods.MarkComplete(id).send({ from: this.state.account });
    await this.loadTask();

  }

  async deleteTask(id) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);

    await todoContract.methods.Delete(id).send({ from: this.state.account });
    await this.loadTask();
  }

  async editTask(id, newName) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);

    await todoContract.methods.Edit(id, newName).send({ from: this.state.account });
    await this.loadTask();
  }

  render() {

    var FILTER_MAP = {
      All: () => true,
      Active: task => !task.completed,
      Completed: task => task.completed
    };
    var FILTER_NAMES = Object.keys(FILTER_MAP);

    var filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === this.state.filter}
        setFilter={(f) => { this.setState({ filter: f }); }}
      />
    ));

    var taskList = this.state.tasks
      .filter(FILTER_MAP[this.state.filter])
      .map(task => (
        <Todo
          id={task.id}
          name={task.name}
          completed={task.completed}
          key={task.id}
          toggleTaskCompleted={this.toggleTaskCompleted}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
        />
      ));

    var tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    var headingText = `${taskList.length} ${tasksNoun}`;

    return (
      this.state.isCompatible ?
        <div className="appcontainer stack-large">
          <h1>Todo</h1>
          <Form addTask={this.addTask} />
          <div className="filters btn-group stack-exception">
            {filterList}
          </div>
          <h2 id="list-heading">
            {headingText}
          </h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading">
            {taskList}
          </ul>
        </div>
        : ""
    );
  };
}
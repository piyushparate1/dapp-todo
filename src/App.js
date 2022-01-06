import './App.css';
import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import AppMetadata from './components/AppMetadata';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'All',
      account: '',
    }

    this.toggleTaskCompleted = this.toggleTaskCompleted.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.loadTask = this.loadTask.bind(this);
    this.onAccountsChanged = this.onAccountsChanged.bind(this);
  }

  componentDidMount() {
    this.loadTask();
    this.onAccountsChanged();
  }

  onAccountsChanged()
  {
    window.ethereum.on('accountsChanged', ((e) => {
      this.loadTask();
    }).bind(this));
  }

  async loadTask() 
  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    const taskList = await todoContract.methods.Get(this.state.account).call();

    this.setState({
      tasks: taskList.map(task => {
        return { id: task.id, name: task.name, completed: task.completed };
      }),
    });
  }

  async addTask(name) 
  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    await todoContract.methods.Add(name).send({from:this.state.account});
    await this.loadTask();
  }

  async toggleTaskCompleted(id) {
    
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    await todoContract.methods.MarkComplete(id).send({from:this.state.account});
    await this.loadTask();
    
  }

  async deleteTask(id) 
  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    await todoContract.methods.Delete(id).send({from:this.state.account});
    await this.loadTask();
  }

  async editTask(id, newName) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    await todoContract.methods.Edit(id, newName).send({from:this.state.account});
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
      <div className="todoapp stack-large">
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
        <AppMetadata></AppMetadata>
      </div>
    );
  };
}
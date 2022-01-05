import './App.css';
import { nanoid } from "nanoid";
import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

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

  addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    this.setState({ tasks: [...this.state.tasks, newTask] });
  }

  toggleTaskCompleted(id) {
    const updatedTasks = this.state.tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });

    this.setState({ tasks: updatedTasks });
  }

  deleteTask(id) {
    const remainingTasks = this.state.tasks.filter(task => id !== task.id);
    this.setState({ tasks: remainingTasks });
  }

  editTask(id, newName) {
    debugger;
    const editedTaskList = this.state.tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    this.setState({ tasks: editedTaskList });
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
        <h5>{this.state.account}</h5>
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
    );
  };
}
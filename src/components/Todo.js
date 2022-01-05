import React from "react";

  export default class App extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        isEditing: false,
        newName: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(e) {
    this.setState({ newName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.newName);
    this.setState({ newName: '' });
    this.setState({ isEditing: false });
  }
  

  editingTemplate = (
<form className="stack-small" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={this.props.id}>
          New name for {this.props.name}
        </label>
        <input
  id={this.props.id}
  className="todo-text"
  type="text"
  value={this.newName}
  onChange={this.handleChange}
/>
      </div>
      <div className="btn-group">
      <button
        type="button"
        className="btn todo-cancel"
        onClick={() => this.setState({ isEditing: false })}
      >
          Cancel
          <span className="visually-hidden">renaming {this.props.name}</span>
        </button>
        <button 
          type="submit" 
          className="btn btn__primary todo-edit"
        >
          Save
          <span className="visually-hidden">new name for {this.props.name}</span>
        </button>
      </div>
    </form>
  );
  
  viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            defaultChecked={this.props.completed}
            onChange={() => this.props.toggleTaskCompleted(this.props.id)}
          />
          <label className="todo-label" htmlFor={this.props.id}>
            {this.props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={() => this.setState({ isEditing: true })}>
            Edit <span className="visually-hidden">{this.props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => this.props.deleteTask(this.props.id)}
          >
            Delete <span className="visually-hidden">{this.props.name}</span>
          </button>
        </div>
    </div>
  );

  render() {
    return <li className="todo">{this.isEditing ? this.editingTemplate : this.viewTemplate}</li>;
  }
}
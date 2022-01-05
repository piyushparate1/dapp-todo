// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo 
{
  mapping(address => ToDoItem[]) private todoCollection;

  struct ToDoItem
  {
    string content;
    bool isCompleted;
  }

  constructor() 
  {
    todoCollection[msg.sender].push(ToDoItem("Hello World!!", false));
    todoCollection[msg.sender].push(ToDoItem("Task #1", false));
    todoCollection[msg.sender].push(ToDoItem("Task #2", false));
  }

  function Add(string calldata todoContent) public
  {
    todoCollection[msg.sender].push(ToDoItem(todoContent, false));
  }

  function Get(address _address) public view
    returns (ToDoItem[] memory todolist)
  {
    return todoCollection[_address];
  }
}
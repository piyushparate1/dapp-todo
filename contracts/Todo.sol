// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo 
{
  mapping(address => ToDoItem[]) public todoList;
  uint32 public todoCount;

  struct ToDoItem
  {
    uint32 id;
    string name;
    bool completed;
  }

  constructor() 
  {
    todoCount = 0;
    Add('Eat');
    Add('Code');
    Add('Sleep');
  }

  function Add(string memory todoContent) public
  {
    todoList[msg.sender].push(ToDoItem(
      todoCount++,
      todoContent,
      false
    ));
  }

  function Get(address _address) public view
    returns (ToDoItem[] memory todolist)
  {
    return todoList[_address];
  }
}
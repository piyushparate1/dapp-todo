// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo 
{
  mapping(address => ToDoItem[]) public todoMapping;
  uint32 public todoCount;
  string[] public todoArray;

  event AddTask(address owner, string task);

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
      returns (bool status)
  {
    ToDoItem memory task = ToDoItem(
      todoCount++,
      todoContent,
      false
    );

    todoMapping[msg.sender].push(task);
    todoArray.push(todoContent);

    emit AddTask(msg.sender, todoContent);

    return true;
  }

  function Get(address _address) public view
    returns (ToDoItem[] memory todolist)
  {
    return todoMapping[_address];
  }
}
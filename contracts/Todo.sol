// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todo {
    mapping(address => ToDoItem[]) public todoMapping;
    string[] public todoArray;
    uint32 public todoCount;

    event AddTask(address owner, string task);
    event EditTask(address owner, uint32 taskId, string task);
    event DeleteTask(address owner, uint32 taskId);
    event MarkCompleted(address owner, uint32 taskId);

    struct ToDoItem {
        uint32 id;
        string name;
        bool completed;
    }

    constructor() {
        todoCount = 0;
        Add("Eat");
        Add("Code");
        Add("Sleep");
    }

    function Add(string memory todoContent) public {
        ToDoItem memory task = ToDoItem(todoCount++, todoContent, false);

        todoMapping[msg.sender].push(task);
        todoArray.push(todoContent);

        emit AddTask(msg.sender, todoContent);
    }

    function Get(address _address)
        public
        view
        returns (ToDoItem[] memory todolist)
    {
        return todoMapping[_address];
    }

    function Delete(uint32 taskId) public {
        ToDoItem[] storage tasksOfUser = todoMapping[msg.sender];
        uint256 length = tasksOfUser.length;

        for (uint256 index = 0; index < length; index++) {
            ToDoItem memory task = tasksOfUser[index];
            if (task.id == taskId) {
                for (uint256 i = index; i < length - 1; i++) {
                    tasksOfUser[i] = tasksOfUser[i + 1];
                }
                delete tasksOfUser[length - 1];
                tasksOfUser.pop();
                emit DeleteTask(msg.sender, taskId);
                break;
            }
        }
    }

    function MarkComplete(uint32 taskId) public {
        ToDoItem[] storage tasksOfUser = todoMapping[msg.sender];
        uint256 length = tasksOfUser.length;

        for (uint256 index = 0; index < length; index++) {
            ToDoItem storage task = tasksOfUser[index];
            if (task.id == taskId) 
            {
                task.completed = true;
                emit MarkCompleted(msg.sender, taskId);
                break;
            }
        }
    }

    function Edit(uint32 taskId, string calldata taskContent) public {
        ToDoItem[] storage tasksOfUser = todoMapping[msg.sender];
        uint256 length = tasksOfUser.length;

        for (uint256 index = 0; index < length; index++) {
            ToDoItem storage task = tasksOfUser[index];
            if (task.id == taskId) 
            {
                task.name = taskContent;
                emit EditTask(msg.sender, taskId, taskContent);
                break;
            }
        }
    }
}

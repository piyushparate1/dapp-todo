export const TODO_LIST_ADDRESS = '0x16e9b9A133bA682c13420D2B2D026CBA37Dd0d04'

export const TODO_LIST_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "task",
        "type": "string"
      }
    ],
    "name": "AddTask",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      }
    ],
    "name": "DeleteTask",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "task",
        "type": "string"
      }
    ],
    "name": "EditTask",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      }
    ],
    "name": "MarkCompleted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "todoArray",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "todoCount",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "todoMapping",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "id",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "todoContent",
        "type": "string"
      }
    ],
    "name": "Add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "Get",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "id",
            "type": "uint32"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "completed",
            "type": "bool"
          }
        ],
        "internalType": "struct Todo.ToDoItem[]",
        "name": "todolist",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      }
    ],
    "name": "Delete",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      }
    ],
    "name": "MarkComplete",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "taskId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "taskContent",
        "type": "string"
      }
    ],
    "name": "Edit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export const TODO_LIST_ADDRESS = '0xfd114B2E9270550487Eb72eF89b9957BA98aF9EB'

export const TODO_LIST_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
    "name": "todoCollection",
    "outputs": [
      {
        "internalType": "int32",
        "name": "id",
        "type": "int32"
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
    "type": "function"
  },
  {
    "inputs": [],
    "name": "todoCounter",
    "outputs": [
      {
        "internalType": "int32",
        "name": "",
        "type": "int32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
            "internalType": "int32",
            "name": "id",
            "type": "int32"
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
    "type": "function"
  }
];
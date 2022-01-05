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
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isCompleted",
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
    }
  ]
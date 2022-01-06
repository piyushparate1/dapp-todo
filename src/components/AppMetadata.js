import React from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from '../config'


export default class AppMetadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contractAccount: '',
    }
  }

  componentDidMount() {
    this.loadAccountDetails();
    this.onAccountsChanged();
  }

  onAccountsChanged()
  {
    window.ethereum.on('accountsChanged', ((e) => {
      this.loadAccountDetails();
    }).bind(this));
  }

  async loadAccountDetails() 
  {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const todoContract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ contractAccount: todoContract._address });
  }

  render() {
    return (
      <div>
        <span>Account: {this.state.account}</span>
        <br></br>
        <span>Contract account: {this.state.contractAccount}</span>
      </div>
    );
  }
}
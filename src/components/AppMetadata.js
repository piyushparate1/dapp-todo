import React from "react";
import Web3 from "web3";
import TodoContract from '../contracts/Todo.json';

export default class AppMetadata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contractAccount: '',
      isCompatible: false,
    }
  }

  async componentDidMount() {

    await this.IdentifyCompatible();

    if (this.state.isCompatible) {
      this.loadAccountDetails();
      this.onAccountsChanged();
    }
  }

  onAccountsChanged() {
    window.ethereum.on('accountsChanged', ((e) => {
      this.loadAccountDetails();
    }).bind(this));
  }

  async loadAccountDetails() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TodoContract.networks[networkId];
    if (!deployedNetwork || !deployedNetwork.address) return;

    const todoContract = new web3.eth.Contract(TodoContract.abi, deployedNetwork.address);
    this.setState({ contractAccount: todoContract._address });
  }

  async IdentifyCompatible() {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        //web3.eth.sendTransaction({/* ... */ });

        this.setState({ isCompatible: true });

      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      // Acccounts always exposed
      //web3.eth.sendTransaction({/* ... */ });
      this.setState({ isCompatible: true });

    }
    // Non-dapp browsers...
    else {
      this.setState({ isCompatible: false });
    }
  }

  render() {
    return (
      this.state.isCompatible ?
        <div className="appcontainer">
                    <b><span>Make sure you are connected to Ropsten network in MetaMask.</span></b>

                    <br></br>

          <span>Account: {this.state.account}</span>
          <br></br>
          <span>Contract: {this.state.contractAccount}</span>
          <br></br>
          <span>Creator: <a target="_blank" href="https://www.linkedin.com/in/paratepiyush">Piyush Parate</a> (<a href="mailto:piyushparate1@gmail.com">piyushparate1@gmail.com</a>)</span>
          <br></br>
        </div>
        :
        <div className="appcontainer">Non-Ethereum browser detected. You should consider trying MetaMask and Ropsten network!</div>
    );
  }
}
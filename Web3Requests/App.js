import './global';
import React, { Component } from 'react';
import { Text, View,TouchableOpacity } from 'react-native';

//ngrok ip
const web3IP = "";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(web3IP));
web3.eth.getAccounts(console.log);

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {};
	}
	deploy  = (account, pwd) => {
		web3.eth.personal.unlockAccount(account, pwd, 10).then(() => {				
			const abi = [{"inputs":[],"name":"Helloworld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
			const code = "0x608060405234801561001057600080fd5b5061017c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063a75f578614610030575b600080fd5b61003861004e565b6040516100459190610124565b60405180910390f35b60606040518060400160405280600b81526020017f48656c6c6f20776f726c64000000000000000000000000000000000000000000815250905090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100c55780820151818401526020810190506100aa565b838111156100d4576000848401525b50505050565b6000601f19601f8301169050919050565b60006100f68261008b565b6101008185610096565b93506101108185602086016100a7565b610119816100da565b840191505092915050565b6000602082019050818103600083015261013e81846100eb565b90509291505056fea2646970667358221220a1f35f72cfd27122560bff56120eb6977c203ebc8c5bca74fc42b40a6ab433bd64736f6c634300080d0033";
			const options = {from:account, gas:'470000'};

			var contract = new web3.eth.Contract(abi);
			var Mycontract = contract.deploy({data:code}).send(options).on('transactionHash', function(transactionHash){
				console.log('transactionHash:'+transactionHash);
			});
		}).catch(() => {
			Alert.alert('server error','error');
		})
	}
	
	useContract  = (account, pwd, hash) => {
		web3.eth.personal.unlockAccount(account, pwd, 10).then( () => {
			web3.eth.getTransactionReceipt(hash).then(r => {
				const address = r.contractAddress
				console.log('contract address:',address)
				const abi = [{"inputs":[],"name":"Helloworld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
				var contract = new web3.eth.Contract(abi,address);
				contract.methods.Helloworld().call().then(console.log);
			});
		});
	}

	render() {
		return (
			<View>		
				<TouchableOpacity onPress = {() => this.deploy("0x535f8f987c503188bc1f64310cbb30cb71c9f09f", "1")}>
				<Text>deploy smart contract</Text>
				</TouchableOpacity>	
			  
				<TouchableOpacity onPress = {() => this.useContract("0x535f8f987c503188bc1f64310cbb30cb71c9f09f", "1","0xccc05c3376bd549c1a24d5d2ff9e41b70f1b65250c0d445e3076b137929eabd4")}>
					<Text>Hello world</Text>
				</TouchableOpacity>			
			</View>
		);
	}
}

export default App;

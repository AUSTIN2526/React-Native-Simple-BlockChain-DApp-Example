import './global';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

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
	

	render() {
		return (
			<View>
				<Text>Hello</Text>
			</View>
		);
	}
}

export default App;


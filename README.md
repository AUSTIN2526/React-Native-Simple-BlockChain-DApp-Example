# React-Native-Simple-BlockChain-App-Example

## Prepare
* React Native
* ngrok
* Node.js(16.1.0)
* Geth(1.10.26)

## How to use
#### 1.Clone this project or download it
```
git clone https://github.com/AUSTIN2526/React-Native-Simple-BlockChain-App-Example
```
#### 2.Run "1.Creat BlockChain Data.bat"(If you want change the chainId,you need to open "genesis.json" and modify chainId)   
 * genesis.json
  ```
  {
  "config": {
    "chainId": MODIFY HERE,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0
  },
  "alloc": {},
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0x2fefd8",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
  ```
#### 3.Run "2.Run Geth Server.bat"(If you modify chainId in Previous step, you need to modify networkid in this step)
  ```
  start geth ^
--datadir data ^
--networkid MODIFY HERE ^
--http ^
--http.addr 0.0.0.0 ^
--http.api admin,eth,debug,miner,net,txpool,personal,web3 ^
--http.corsdomain * ^
--http.vhosts=* ^
--allow-insecure-unlock ^
--http.port 8545
  ```
#### 4.Run "3.Open Geth Console.bat" you will open the geth console,next enter the following command
  * Creat account
  ```
  personal.newAccount(enter you password)
  //"0x58e77650fba109885036029e9618af508e2543b9"
  ```
  * Mining(If this step success,you will see "🔨 mined potential block" in geth console)
  ```
  miner.start(1)
  //null
  ```
  * Stop mining
  ```
  miner.stop()
  //null
  ```
#### 5.Run "4.init ReactNative.bat"
  * This step you will get the initial react native APP
  
#### 6.Run "5.Install Lib.bat"(If you don't install yarn please enter "npm install yarn --g" in CMD)
  * This step you will install web3.js and react-navigation/native and their related library   
  
#### 7.Move all data in "Web3Requests" to "Dapp"
  * Configuration web3 related files

#### 8.Use ngrok configuration your extranet IP(If you have extranet pass this step)
  * After download ngrok and sign in account enter the following command
  ```
  ngrok http 8545
  ```
  
#### 9.Open "App.js" and post you extranet IP
  * Install APP to your android phone or your simulator

## Start designing your DAPP
#### 1.creat a hello world smart contract
* creat a button
```
<View style = {styles.container}>		
  <TouchableOpacity onPress = {() => this.deploy(YOU GETH ACCOUNT,YOU PASSWORD)}>
    <Text>deploy smart contract</Text>
  </TouchableOpacity>					
</View>
```
* define function
```
deploy  = (account, pwd) => {
		web3.eth.personal.unlockAccount(account, pwd, 10).then(() => {				
			const abi = [{"inputs":[],"name":"sayHelloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
			const code = "0x608060405234801561001057600080fd5b5061017c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806345773e4e14610030575b600080fd5b61003861004e565b6040516100459190610124565b60405180910390f35b60606040518060400160405280600b81526020017f48656c6c6f20576f726c64000000000000000000000000000000000000000000815250905090565b600081519050919050565b600082825260208201905092915050565b60005b838110156100c55780820151818401526020810190506100aa565b838111156100d4576000848401525b50505050565b6000601f19601f8301169050919050565b60006100f68261008b565b6101008185610096565b93506101108185602086016100a7565b610119816100da565b840191505092915050565b6000602082019050818103600083015261013e81846100eb565b90509291505056fea264697066735822122075b767592eff22d2b052e8d69016de2d91a69652afa7bb1cc072df6f7ea23f2764736f6c634300080d0033";
			const options = {from:account, gas:'470000'};

			var contract = new web3.eth.Contract(abi);
			var Mycontract = contract.deploy({data:code}).send(options).on('transactionHash', function(transactionHash){
				console.log('transactionHash:'+transactionHash);
			});
				
				
		}).catch(() => {
			Alert.alert('server error','error');
		})
	}
```
#### 2.Test the code,you will get the transaction Hash in you react native console,and record it
```
transactionHash:0x533013b2d6f59c8bc7541dc80681041bca210380c9d539b5134270b82e0632df
```
#### 3.Wait the miner to write contract,the simple way is open your geth console and enter the following command
```
miner.start(1)
```
#### 4. Call contract
```
useContract  = (account, pwd, hash) => {
		web3.eth.personal.unlockAccount(account, pwd, 10).then( () => {
			web3.eth.getTransactionReceipt(hash).then(r => {
				const address = r.contractAddress
				console.log('contract address:',address)
				const abi = [{"inputs":[],"name":"sayHelloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}];
				var contract = new web3.eth.Contract(abi,address);
				contract.methods.sayHelloWorld().call().then(console.log);
			});
		});
	}
```
Now you can see the "hello word" in your react native console

## How to creat different contract
* Use Remix IDE write contract
* Generate "abi" and "bytecode"
* Change deploy function "abi" and "bytecode"



    

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

if(!web3.isConnected()) console.log("not connected");
else console.log("connected");


web3.eth.defaultAccount = web3.eth.accounts[1];
web3.personal.unlockAccount(web3.eth.accounts[1],"ehlenvesehlen4271",100) ;
var whoami              = web3.eth.defaultAccount;
var blockNumber         = web3.eth.blockNumber;

console.log("whoami: " + whoami);
console.log("blockNumber: " + blockNumber);
var currentBalance = web3.fromWei(web3.eth.getBalance(whoami), "ether");
console.log("Current Balance: " + currentBalance + " ether");

//  eBloc LinkedList for ethereum contracts
//address: ... //address on the private network.
//address="0xa8d81519b7ec1c8eb7982baccc4a2d9dec81df04";

var mymsg = "hello contract"
abi=[
	{
		"constant": true,
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "mymessage",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "mymsg",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
//var MyContract          = web3.eth.contract(abi);
//var myContractInstance  = MyContract.at(address);
var helloworldContract = web3.eth.contract(abi);
var helloworld = helloworldContract.new(
   mymsg,
   {
     from: web3.eth.accounts[1], 
     data: '0x6060604052341561000f57600080fd5b6040516103ef3803806103ef833981016040528080518201919050508060009080519060200190610041929190610048565b50506100ed565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008957805160ff19168380011785556100b7565b828001600101855582156100b7579182015b828111156100b657825182559160200191906001019061009b565b5b5090506100c491906100c8565b5090565b6100ea91905b808211156100e65760008160009055506001016100ce565b5090565b90565b6102f3806100fc6000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e21f37ce14610051578063eb3a9bd8146100df575b600080fd5b341561005c57600080fd5b61006461016d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a4578082015181840152602081019050610089565b50505050905090810190601f1680156100d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100ea57600080fd5b6100f2610215565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610132578082015181840152602081019050610117565b50505050905090810190601f16801561015f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101756102b3565b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561020b5780601f106101e05761010080835404028352916020019161020b565b820191906000526020600020905b8154815290600101906020018083116101ee57829003601f168201915b5050505050905090565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102ab5780601f10610280576101008083540402835291602001916102ab565b820191906000526020600020905b81548152906001019060200180831161028e57829003601f168201915b505050505081565b6020604051908101604052806000815250905600a165627a7a72305820f58c815ffda01b1e12a8f5be0211970859bba5ff6586092a1e8893dd5b160f8e0029', 
     gas: '4700000'
   }, function (e, contract){
    if(!e) {
	   if(!contract.address) {
	     console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
	   } else {
	     console.log("Contract mined! Address: " + contract.address);
	     console.log(contract);
	   }     
	} else{   
		console.log(e);     
	}
 });


function sleep(milliseconds) {
	var start = new Date().getTime(); 
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) break;
 	}
}

function fundtransfer(fromacc,toacc,amt) {
	eth.sendTransaction({from: fromacc, to: toacc, value: web3.toWei(amt, "ether")}) ;
}

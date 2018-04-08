var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

if(!web3.isConnected()) console.log("not connected");
else console.log("connected");

var acc = web3.eth.accounts[1];
console.log("Acc0: " + acc);
console.log("Block Number: " + web3.eth.blockNumber);
var currentBalance = web3.fromWei(web3.eth.getBalance(acc), "ether");
console.log("Current Balance: " + currentBalance);

function sleep(milliseconds) {
	var start = new Date().getTime(); 
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) break;
 	}
}

function fundtransfer(fromacc,toacc,amt) {
	eth.sendTransaction({from: fromacc, to: toacc, value: web3.toWei(amt, "ether")}) ;
}


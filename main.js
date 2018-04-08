var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

if(!web3.isConnected()) console.log("not connected");
else console.log("connected");

//  eBloc LinkedList for ethereum contracts
//address: ... //address on the private network.
//address="0xa8d81519b7ec1c8eb7982baccc4a2d9dec81df04";

/*
abi=[{"constant":true,"inputs":[{"name":"c_id","type":"address"},{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint256"}],"name":"get_length","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"c_id","type":"address"},{"name":"coreLimit","type":"uint32"}],"name":"setClusterCoreLimit","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"c_id","type":"address"}],"name":"getClusterName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"c_id","type":"address"}],"name":"getClusterCoreMinutePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"address"}],"name":"getSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"c_id","type":"address"}],"name":"stopCluster","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"c_id","type":"address"},{"name":"ipfsHash","type":"string"},{"name":"core_","type":"uint32"},{"name":"time","type":"string"}],"name":"insertJob","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint256"},{"name":"str","type":"string"}],"name":"setJobStatus","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"c_id","type":"address"},{"name":"clusterName","type":"string"}],"name":"setClusterName","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getClusterAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"c_id","type":"address"},{"name":"price","type":"uint256"}],"name":"setClusterCoreMinutePrice","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"testCallStack","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"s","type":"uint32"},{"name":"e","type":"uint32"},{"name":"c","type":"int32"},{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint32"},{"name":"amountToPayBack","type":"uint256"}],"name":"receiptCheck","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint256"},{"name":"str","type":"string"}],"name":"setJob_IPFS_out","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"c_id","type":"address"},{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint256"}],"name":"getJobStatus","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"c_id","type":"address"},{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint256"}],"name":"getJob_IPFS_out","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"address"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"coreLimit","type":"uint32"},{"name":"clusterName","type":"string"},{"name":"price","type":"uint256"}],"name":"createCluster","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get_node","outputs":[{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"c_id","type":"address"},{"name":"ipfsHash","type":"string"},{"name":"index","type":"uint32"}],"name":"getClusterJobRecieved","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deleteAllJobs","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"c_id","type":"address"},{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"ipfsHash","type":"string"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogReceivedFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"c_id","type":"address"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogReturnedFunds","type":"event"}];
*/
web3.eth.defaultAccount = web3.eth.accounts[1];
var whoami              = web3.eth.defaultAccount;
//var MyContract          = web3.eth.contract(abi);
//var myContractInstance  = MyContract.at(address);
var blockNumber         = web3.eth.blockNumber;

console.log("whoami: " + whoami);
console.log("blockNumber: " + blockNumber);
var currentBalance = web3.fromWei(web3.eth.getBalance(whoami), "ether");
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

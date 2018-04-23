const Lottery = artifacts.require('Lottery')
var Promise = require('promise');


// advances timestamp of the last block
const increaseTime = function(addSeconds) {
	web3.currentProvider.send({
		jsonrpc: "2.0",
		method: "evm_increaseTime",
		params: [addSeconds],
		id: 0
	})
}

// mines one block
const mineOneBlock = function() {
	 web3.currentProvider.send({
		jsonrpc: "2.0",
		method: "evm_mine",
		params: [],
		id: 0
	})
}

// mines multiple blocks
const mineBlocks = function (addBlocks) {
	var i;
	for(i = 0; i<addBlocks;i++){
		mineOneBlock();
	}
}


contract('Lottery', function(accounts) {

	it("purchase full ticket", function(){
		var number1 = "1";
		var number2 = "2";
		var number3 = "3";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.getLotteryBalance.call();
		}).then(function(balance){
			lotteryBalanceStart = parseInt(balance);
			return lottery.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(8,"finney")});
		}).then(function(result){
			console.log("success: full ticket is purchased");
			return lottery.getLotteryBalance.call();
		}, function(error){
			assert.fail("full ticket should be purchased");
		}).then(function(balance){
			lotteryBalanceEnd = parseInt(balance);
			assert.equal(lotteryBalanceStart + parseInt(web3.toWei(8,"finney")),lotteryBalanceEnd,"lottery balance should increase by 8 finneys when a full ticket purchased");
		})

	});

	

	it("purchase half ticket", function(){
		var number1 = "4";
		var number2 = "5";
		var number3 = "6";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.getLotteryBalance.call();
		}).then(function(balance){
			lotteryBalanceStart = parseInt(balance);
			return lottery.buyHalfTicket(hashes,{from:accounts[0],value:web3.toWei(4,"finney")});
		}).then(function(result){
			console.log("success: half ticket is purchased");
			return lottery.getLotteryBalance.call();
		}, function(error){
			assert.fail("half ticket should be purchased");
		}).then(function(balance){
			lotteryBalanceEnd = parseInt(balance);
			assert.equal(lotteryBalanceStart + parseInt(web3.toWei(4,"finney")),lotteryBalanceEnd,"lottery balance should increase by 4 finneys when a half ticket purchased");
		})

	});

	it("purchase quarter ticket", function(){
		var number1 = "7";
		var number2 = "8";
		var number3 = "9";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.getLotteryBalance.call();
		}).then(function(balance){
			lotteryBalanceStart = parseInt(balance);
			return lottery.buyQuarterTicket(hashes,{from:accounts[0],value:web3.toWei(2,"finney")});
		}).then(function(result){
			console.log("success: quarter ticket is purchased");
			return lottery.getLotteryBalance.call();
		}, function(error){
			assert.fail("quarter ticket should be purchased");
		}).then(function(balance){
			lotteryBalanceEnd = parseInt(balance);
			assert.equal(lotteryBalanceStart + parseInt(web3.toWei(2,"finney")),lotteryBalanceEnd,"lottery balance should increase by 2 finneys when a quarter ticket purchased");
		})

	});













	it("revert full ticket purchase", function(){
		var number1 = "10";
		var number2 = "11";
		var number3 = "12";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(7,"finney")});
		}).then(function (result) {
			assert.fail("it should revert full ticket purchase when the purchaser send not equal to 8 finney");
		}, function (error) {
			console.log("success: full ticket purchase is reverted when the purchaser send not equal to 8 finney");
		})

	});

	it("revert half ticket purchase", function(){
		var number1 = "13";
		var number2 = "14";
		var number3 = "15";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.buyHalfTicket(hashes,{from:accounts[0],value:web3.toWei(5,"finney")});
		}).then(function (result) {
			assert.fail("it should revert half ticket purchase when the purchaser send not equal to 4 finney");
		}, function (error) {
			console.log("success: half ticket purchase is reverted when the purchaser send not equal to 4 finney");
		})

	});

	it("revert quarter ticket purchase", function(){
		var number1 = "16";
		var number2 = "17";
		var number3 = "18";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.buyQuarterTicket(hashes,{from:accounts[0],value:web3.toWei(3,"finney")});
		}).then(function (result) {
			assert.fail("it should revert quarter ticket purchase when the purchaser send not equal to 2 finney");
		}, function (error) {
			console.log("success: quarter ticket purchase is reverted when the purchaser send not equal to 2 finney");
		})

	});





	
	it("reveal the purchased ticket with correct numbers", function(){
		var number1 = "19";
		var number2 = "20";
		var number3 = "21";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.getLotteryBalance.call();
		}).then(function(){
			return lottery.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(8,"finney")});
		}).then(function () {
			console.log(web3.eth.blockNumber);
			mineBlocks(52-web3.eth.blockNumber);
			console.log(web3.eth.blockNumber);
			return lottery.revealTicket.call(numbers,{from:accounts[0]});
		}).then(function (result) {
			console.log("success: the ticket is revealed with correct numbers")
		}, function(error){
			assert.fail("the ticket should be revealed with correct numbers");
		})

	});

	it("reveal the purchased ticket with incorrect numbers", function(){
		var number1 = "22";
		var number2 = "23";
		var number3 = "24";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var lottery;

		return Lottery.deployed().then(function(instance){
			lottery = instance;
			return lottery.getLotteryBalance.call();
		}).then(function(){
			return lottery.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(8,"finney")});
		}).then(function () {
			mineBlocks(52-web3.eth.blockNumber);
			return lottery.revealTicket.call(["7", "3", "12"],{from:accounts[0]});
		}).then(function (result) {
			assert.fail("the ticket should not be revealed with incorrect numbers");
		}, function(error){
			console.log("success: the ticket is not revealed with incorrect numbers");
		})

	});


	/*
	it("purchase more than 2 tickets with same random numbers", function(){
		var number1 = "19";
		var number2 = "20";
		var number3 = "21";

		var numbers = [];
		numbers.push(number1);
		numbers.push(number2);
		numbers.push(number3);

		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var hashes = [];
		hashes.push(ticketHash1);
		hashes.push(ticketHash2);
		hashes.push(ticketHash3);
		

		var lotteryBalanceStart;
		var lotteryBalanceEnd;
		var contract;

		return Lottery.deployed().then(function(instance){
			contract = instance;
			return contract.getLotteryBalance.call();
		}).then(function(){
			return contract.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(8,"finney")});
		}).then(function () {
			console.log(web3.eth.blockNumber);
			mineBlocks(52-web3.eth.blockNumber);
			console.log(web3.eth.blockNumber);
			return contract.revealTicket.call(["3", "12", "7"],{from:accounts[0]});
		}).then(function (result) {
            assert.fail("reveal ticket with wrong numbers is failed");
        }, function(error){
			console.log("it should not purchase more than 2 tickets with same random numbers");
		})


	});*/
});

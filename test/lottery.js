const Lottery = artifacts.require('Lottery')

contract('Lottery', function(accounts) {
	it("should assert true", function(done) {
		var lottery = Lottery.deployed();
		assert.isTrue(true);
		done();
	});

	it("full ticket purchase", function(){
		var number1 = "1";
		var number2 = "2";
		var number3 = "3";
		var ticketHash1 = web3.sha3(number1,accounts[0]);
		var ticketHash2 = web3.sha3(number2,accounts[0]);
		var ticketHash3 = web3.sha3(number3,accounts[0]);

		var lotteryBalanceFirst;
		var lotteryBalanceEnd;
		var contract;
		var hashes = [ticketHash1, ticketHash2. ticketHash3];


		return Lottery.deployed().then(function(instance){
			contract = instance;
			return contract.getLotteryBalance.call();
		}).then(function(balance){
			lotteryBalanceFirst = parseInt(balance);
			return contract.buyFullTicket(hashes,{from:accounts[0],value:web3.toWei(8,"finney")});
		}).then(function(result){
			//console.log(result);
			assert.equal(Boolean(result), true);
			return contract.getLotteryBalance.call();
		}).then(function(balance){
			lotteryBalanceEnd = parseInt(balance);
			assert.equal(lotteryBalanceFirst + parseInt(web3.toWei(8,"finney")),lotteryBalanceEnd,"lottery balance should be 8 finneys more than the lottery balance before a full ticket sell");
		})

	});
});

const Lottery = artifacts.require('Lottery')

module.exports = function(deployer) {
	// Use deployer to state migration tasks.
	deployer.deploy(Lottery)
};

const Token1 = artifacts.require("Token1");

module.exports = async function(deployer, network, accounts) {
  const initialOwner = accounts[0];  // Use the first account as the owner

  await deployer.deploy(Token1, initialOwner);
};

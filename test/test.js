const Token1 = artifacts.require('Token1');
const { assert, expect } = require('chai');
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

contract('Token1', (accounts) => {
  let tokenInstance;
  const [owner, user1, user2] = accounts;

  before(async () => {
    // Deploy Token1 contract with the initial owner as 'owner'
    tokenInstance = await Token1.new(owner);
  });

  describe('Deployment', () => {
    it('should deploy the contract with correct initial values', async () => {
      const name = await tokenInstance.name();
      const symbol = await tokenInstance.symbol();
      const decimals = await tokenInstance.decimals();
      const ownerBalance = await tokenInstance.balanceOf(owner);

      assert.equal(name, 'TestToken', 'Token name should be TestToken');
      assert.equal(symbol, 'TT', 'Token symbol should be TT');
      assert.equal(decimals.toString(), '18', 'Token should have 18 decimals');
      assert(ownerBalance.eq(new BN('10000000000000000000000000000000')), 'Owner should have initial balance');
    });
  });

  describe('Minting', () => {
    it('should allow the owner to mint tokens', async () => {
      const mintAmount = new BN('1000');
      const initialBalance = await tokenInstance.balanceOf(user1);

      const tx = await tokenInstance.mint(user1, mintAmount, { from: owner });
      expectEvent(tx, 'Transfer', {
        from: constants.ZERO_ADDRESS,
        to: user1,
        value: mintAmount,
      });

      const finalBalance = await tokenInstance.balanceOf(user1);
      assert(finalBalance.eq(initialBalance.add(mintAmount)), 'User1 balance should increase by the minted amount');
    });

    it('should not allow non-owners to mint tokens', async () => {
      await expectRevert(
        tokenInstance.mint(user1, new BN('1000'), { from: user1 }),
        'Ownable: caller is not the owner'
      );
    });
  });

  describe('Burning', () => {
    it('should allow token holders to burn their tokens', async () => {
      const burnAmount = new BN('500');
      const initialBalance = await tokenInstance.balanceOf(user1);

      const tx = await tokenInstance.burn(burnAmount, { from: user1 });
      expectEvent(tx, 'Transfer', {
        from: user1,
        to: constants.ZERO_ADDRESS,
        value: burnAmount,
      });

      const finalBalance = await tokenInstance.balanceOf(user1);
      assert(finalBalance.eq(initialBalance.sub(burnAmount)), 'User1 balance should decrease by the burned amount');
    });

    it('should not allow users to burn more tokens than they own', async () => {
      const balance = await tokenInstance.balanceOf(user1);
      const excessiveBurnAmount = balance.add(new BN('1')); // Trying to burn more than balance

      await expectRevert(
        tokenInstance.burn(excessiveBurnAmount, { from: user1 }),
        'ERC20: burn amount exceeds balance'
      );
    });
  });

  describe('Ownership', () => {
    it('should set the correct owner', async () => {
      const contractOwner = await tokenInstance.owner();
      assert.equal(contractOwner, owner, 'Owner should be the account that deployed the contract');
    });

    it('should transfer ownership to a new owner', async () => {
      await tokenInstance.transferOwnership(user2, { from: owner });

      const newOwner = await tokenInstance.owner();
      assert.equal(newOwner, user2, 'Ownership should be transferred to user2');
    });

    it('should not allow non-owners to transfer ownership', async () => {
      await expectRevert(
        tokenInstance.transferOwnership(user1, { from: user1 }),
        'Ownable: caller is not the owner'
      );
    });
  });
});

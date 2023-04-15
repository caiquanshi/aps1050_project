const Donation = artifacts.require("SendMeEther");

require('chai-almost');


contract("Donation", (donater) => {
  var donationInstance;

  before(async () => {
    donationInstance = await Donation.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await donationInstance.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('donation', async () => {
    it('donator donates successfully', async () => {
      // Track the receiver balance before purchase
      let oldBalance
      oldBalance = await web3.eth.getBalance(donater[0])
      oldBalance = new web3.utils.BN(oldBalance)

      result = await donationInstance.receiveEther({from: donater[0], value: web3.utils.toWei('2', 'Ether')})

      // Check that the receiver receives the donation
      let newBalance
      newBalance = await web3.eth.getBalance(donater[0])
      newBalance = new web3.utils.BN(newBalance)

      let donate
      donate = web3.utils.toWei('2.0005644', 'Ether') // plus gas fee
      donate = new web3.utils.BN(donate)

      const exepectedBalance = newBalance.add(donate)

      expect(parseInt(oldBalance.toString())).to.be.approximately(parseInt(exepectedBalance.toString()), 1000000000000000);
    })
  })
})
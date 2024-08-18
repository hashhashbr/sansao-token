const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SansaoToken", function () {
  let SansaoToken;
  let sansaoToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    SansaoToken = await ethers.getContractFactory("SansaoToken");
    sansaoToken = await SansaoToken.deploy(ethers.parseEther("1000000"));
    await sansaoToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await sansaoToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await sansaoToken.balanceOf(owner.address);
      expect(await sansaoToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await sansaoToken.transfer(addr1.address, 50);
      const addr1Balance = await sansaoToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await sansaoToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await sansaoToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await sansaoToken.balanceOf(owner.address);
      await expect(
        sansaoToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
      expect(await sansaoToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await sansaoToken.balanceOf(owner.address);
      await sansaoToken.transfer(addr1.address, 100);
      await sansaoToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await sansaoToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - BigInt(150));

      const addr1Balance = await sansaoToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await sansaoToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
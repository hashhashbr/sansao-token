const hre = require("hardhat");

async function main() {
  const initialSupply = hre.ethers.parseEther("30000000"); 
  const SansaoToken = await hre.ethers.getContractFactory("SansaoToken");
  const sansaoToken = await SansaoToken.deploy(initialSupply);

  await sansaoToken.waitForDeployment();

  console.log("SansaoToken deployed to:", await sansaoToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

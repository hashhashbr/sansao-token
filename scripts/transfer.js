const hre = require("hardhat");

async function main() {

  const contractAddress = "0xc3196d9946E35a61851D667710Fcf927bB2d84cA";

  
  const amount = hre.ethers.parseEther("10000");

  
  const recipientAddress = "0xEB740979747A2e49223E404466D3AEC1AADE3A97";

  
  const SansaoToken = await hre.ethers.getContractFactory("SansaoToken");
  const sansaoToken = await SansaoToken.attach(contractAddress);

  console.log("Iniciando transferência...");

  try {
    
    const tx = await sansaoToken.transfer(recipientAddress, amount);

    
    await tx.wait();

    console.log(`Transferência de ${hre.ethers.formatEther(amount)} tokens para ${recipientAddress} concluída.`);

    
    const balance = await sansaoToken.balanceOf(recipientAddress);
    console.log(`Novo saldo do destinatário: ${hre.ethers.formatEther(balance)} tokens`);
  } catch (error) {
    console.error("Erro durante a transferência:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
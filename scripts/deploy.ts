import { ethers, run } from 'hardhat';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so verifyContract here is a factory for instances of our Verify contract.
  */
  const verifyContract = await ethers.getContractFactory('Verify');

  // deploy the contract
  const deployedVerifyContract = await verifyContract.deploy();

  await deployedVerifyContract.deployed();

  // print the address of the deployed contract
  console.log('Verify Contract Address:', deployedVerifyContract.address);

  console.log('Sleeping.....');
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000);

  // Verify the contract after deploying
  await run('verify:verify', {
    address: deployedVerifyContract.address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {
  const UserWins = await ethers.getContractFactory("UserWins");
  const userWins = await UserWins.deploy();

  // Replace deployed() with waitForDeployment()
  await userWins.waitForDeployment();

  // Replace .address with getAddress()
  const deployedAddress = await userWins.getAddress();
  console.log("UserWins deployed to:", deployedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

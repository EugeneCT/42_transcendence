import { ethers } from "ethers";
import * as dotenv from "dotenv";
import contractJson from "../../solidity/artifacts/contracts/UserWins.sol/UserWins.json" assert { type: "json" };
dotenv.config();
const { RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;
// Get ABI from compiled contract JSON
const abi = contractJson.abi;
// Create provider & signer
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
// Attach to deployed contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
export default contract;

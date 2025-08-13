var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ethers } from "hardhat";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserWins = yield ethers.getContractFactory("UserWins");
        const userWins = yield UserWins.deploy();
        // Replace deployed() with waitForDeployment()
        yield userWins.waitForDeployment();
        // Replace .address with getAddress()
        const deployedAddress = yield userWins.getAddress();
        console.log("UserWins deployed to:", deployedAddress);
    });
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});

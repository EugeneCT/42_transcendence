// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.28",
// };

// module.exports = {
//   networks: {
//     ganache_cli: {
//       url: "http://127.0.0.1:8545"
//     },
//     ganache_gui: {
//       url: "http://127.0.0.1:7545"
//     }
//   }
// }
// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache_cli: {
      url: "http://127.0.0.1:8545",
    },
    ganache_gui: {
      url: "http://127.0.0.1:7545",
    },
  },
};

export default config;
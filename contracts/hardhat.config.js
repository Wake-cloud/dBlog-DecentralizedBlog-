require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.9", 
  networks: {
    polygonAmoy: {
      url: "https://polygon-amoy.g.alchemy.com/v2/bXVsZXhsIcgy7ceLe92s7v8vZsQG64hB",  
      accounts: [""],  
    },
    polygonMainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/bXVsZXhsIcgy7ceLe92s7v8vZsQG64hB", 
      accounts: [""],  
    },
  },
  etherscan: {
    apiKey: "YOUR_POLYGONSCAN_API_KEY",  
  },
};

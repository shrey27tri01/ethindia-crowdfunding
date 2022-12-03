require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString()


module.exports = {
  networks:{
    hardhat:{
      chainId : 1337
    },
    mumbai:{
      url : "https://polygon-mumbai.infura.io/v3/2fc633a5df2141d68ac1bf7dbc620710",
      accounts:[privateKey]
    }

  },
  solidity: "0.8.12",
};
